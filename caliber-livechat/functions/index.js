const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(functions.config().gemini.key);

const SYSTEM_PROMPT = `You are Caliber AI, a friendly and stylish assistant for Caliber Shoes, Nepal's premium footwear brand.

Your personality:
- Friendly and helpful
- Professional but approachable
- Knowledgeable about shoes, fashion, and customer service
- Proud to represent a Nepalese brand

Key information about Caliber Shoes:
- Premium footwear collection (sneakers, athletic, formal shoes)
- Prices in NPR (रू)
- Free shipping on orders over रू 13,000
- 30-day money-back guarantee
- 24/7 customer support
- Esewa payment integration for Nepal

What you can help with:
- Product recommendations and information
- Order status and tracking
- Shipping and returns
- Payment methods (especially Esewa)
- Sizing and fit guidance
- General customer service

Response guidelines:
- Keep responses clear and concise
- Use Nepali Rupee (रू) for all prices
- Be enthusiastic about Caliber Shoes products
- Always offer additional help
- Use friendly, conversational language

If you don't know something specific, say you'll connect them with a human representative.`;

// Handle new messages
exports.onMessageCreated = functions.firestore
  .document('conversations/{userId}/messages/{messageId}')
  .onCreate(async (snap, context) => {
    const message = snap.data();
    const { userId } = context.params;

    // Only process user messages, not admin or AI responses
    if (message.sender !== 'user') {
      return null;
    }

    try {
      // Check if admin is online (has activity in last 30 seconds)
      const adminStatusRef = admin.firestore().collection('admin').doc('status');
      const adminStatus = await adminStatusRef.get();
      const isAdminOnline = adminStatus.exists &&
        adminStatus.data().lastSeen &&
        Date.now() - adminStatus.data().lastSeen.toMillis() < 30000;

      if (isAdminOnline) {
        console.log('Admin is online, waiting for manual response');
        // Update conversation to show admin is active
        await admin.firestore()
          .collection('conversations')
          .doc(userId)
          .update({
            adminActive: true,
            lastActivity: admin.firestore.FieldValue.serverTimestamp()
          });
        return null;
      }

      // Admin is offline, generate AI response
      console.log('Admin offline, generating AI response');

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Get conversation history for context
      const conversationRef = admin.firestore().collection('conversations').doc(userId);
      const conversation = await conversationRef.get();

      const messagesRef = admin.firestore()
        .collection('conversations')
        .doc(userId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(10);

      const recentMessages = await messagesRef.get();
      const history = recentMessages.docs
        .reverse()
        .map(doc => ({
          role: doc.data().sender === 'user' ? 'user' : 'model',
          parts: [{ text: doc.data().text }]
        }));

      const chat = model.startChat({
        history: history,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        }
      });

      const result = await chat.sendMessage(message.text);
      const response = await result.response;
      const aiResponse = response.text();

      // Save AI response to Firestore
      const aiMessageRef = admin.firestore()
        .collection('conversations')
        .doc(userId)
        .collection('messages')
        .doc();

      await aiMessageRef.set({
        id: aiMessageRef.id,
        text: aiResponse,
        sender: 'ai',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        read: false
      });

      // Update conversation metadata
      await conversationRef.update({
        lastMessage: aiResponse,
        lastMessageTime: admin.firestore.FieldValue.serverTimestamp(),
        lastSender: 'ai',
        adminActive: false
      });

      console.log('AI response sent successfully');
      return null;

    } catch (error) {
      console.error('Error generating AI response:', error);

      // Send error message as fallback
      const errorMessageRef = admin.firestore()
        .collection('conversations')
        .doc(userId)
        .collection('messages')
        .doc();

      await errorMessageRef.set({
        id: errorMessageRef.id,
        text: 'Sorry, I encountered an error. Let me connect you with our customer service team.',
        sender: 'ai',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        read: false
      });

      return null;
    }
  });

// Update admin online status
exports.updateAdminStatus = functions.https.onCall(async (data, context) => {
  // Verify admin authentication
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required');
  }

  const { status } = data;

  await admin.firestore()
    .collection('admin')
    .doc('status')
    .set({
      online: status,
      lastSeen: admin.firestore.FieldValue.serverTimestamp(),
      adminId: context.auth.uid
    });

  return { success: true };
});

// Send admin message
exports.sendAdminMessage = functions.https.onCall(async (data, context) => {
  // Verify admin authentication
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required');
  }

  const { userId, message } = data;

  // Save admin message
  const messageRef = admin.firestore()
    .collection('conversations')
    .doc(userId)
    .collection('messages')
    .doc();

  await messageRef.set({
    id: messageRef.id,
    text: message,
    sender: 'admin',
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    read: false,
    adminId: context.auth.uid
  });

  // Update conversation
  await admin.firestore()
    .collection('conversations')
    .doc(userId)
    .update({
      lastMessage: message,
      lastMessageTime: admin.firestore.FieldValue.serverTimestamp(),
      lastSender: 'admin',
      adminActive: true
    });

  return { success: true };
});

// Get all conversations for admin
exports.getAllConversations = functions.https.onCall(async (data, context) => {
  // Verify admin authentication
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required');
  }

  const conversationsRef = admin.firestore().collection('conversations');
  const snapshot = await conversationsRef.get();

  const conversations = [];
  snapshot.forEach(doc => {
    conversations.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return conversations;
});
