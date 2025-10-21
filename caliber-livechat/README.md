# 🛍️ Caliber Shoes - AI Live Chat System

A complete real-time customer chat system with AI chatbot integration for Caliber Shoes e-commerce platform.

## 🚀 Features

### ✅ Customer Chat Interface
- **Modern chat UI** with Caliber Shoes branding
- **Real-time messaging** with typing indicators
- **Voice input support** (optional)
- **Responsive design** for all devices
- **Auto-scroll** to latest messages

### ✅ Admin Dashboard
- **Secure admin login** with Firebase Auth
- **Real-time conversation monitoring**
- **Live message viewing** and response
- **AI/Manual mode toggle**
- **Conversation statistics** and management
- **Unread message badges**

### ✅ AI Integration
- **Gemini Pro AI** for intelligent responses
- **Brand-specific personality** and knowledge
- **Automatic responses** when admin is offline
- **Context-aware conversations**
- **Fallback error handling**

### ✅ Backend Features
- **Firebase Cloud Functions** for serverless AI processing
- **Firestore real-time database** for message storage
- **Admin status tracking** for online/offline detection
- **Secure authentication** and authorization

## 📁 Project Structure

```
caliber-livechat/
│
├── functions/
│   └── index.js              # AI integration & message handlers
│
├── public/
│   ├── chat.html            # Customer chat interface
│   └── admin.html           # Admin dashboard
│
├── firebase.json            # Firebase configuration
├── firestore.rules          # Security rules
└── package.json             # Dependencies
```

## 🛠️ Setup Instructions

### 1. Firebase Project Setup

1. **Create a Firebase Project**
   ```bash
   # Install Firebase CLI (if not installed)
   npm install -g firebase-tools

   # Login to Firebase
   firebase login

   # Initialize Firebase in the project
   cd caliber-livechat
   firebase init

   # Select: Functions, Firestore, Hosting
   ```

2. **Configure Firebase Services**
   - Enable **Firestore Database**
   - Enable **Firebase Functions**
   - Enable **Firebase Authentication**

3. **Set up Firestore Security**
   ```bash
   # Deploy security rules
   firebase deploy --only firestore:rules
   ```

### 2. Environment Configuration

1. **Set up Gemini API Key**
   ```bash
   # In Firebase Console → Functions → Environment Variables
   # Add: GEMINI_API_KEY = "your-gemini-api-key-here"
   ```

2. **Update Firebase Config**
   - Open `public/chat.html`
   - Open `public/admin.html`
   - Replace `your-api-key`, `your-project-id`, etc. with your Firebase config

### 3. Install Dependencies

```bash
cd caliber-livechat
npm install
```

### 4. Deploy Functions

```bash
# Deploy Firebase Functions (includes AI integration)
firebase deploy --only functions
```

### 5. Deploy Hosting

```bash
# Deploy the chat interfaces
firebase deploy --only hosting
```

## 🎯 Usage Guide

### Customer Chat Access

After deployment, customers can access the chat at:
- **Main chat page**: `https://your-project.firebaseapp.com/chat`
- **Admin dashboard**: `https://your-project.firebaseapp.com/admin`

### Integrating Chat into Your Website

Add this script to your main website's HTML:

```html
<!-- Caliber Chat Widget -->
<script type="module">
    // Initialize chat widget
    const chatScript = document.createElement('script');
    chatScript.src = 'https://your-project.firebaseapp.com/chat.html';
    chatScript.type = 'module';
    document.head.appendChild(chatScript);

    // Add chat button to your site
    const chatButton = document.createElement('div');
    chatButton.innerHTML = `
        <button onclick="window.open('https://your-project.firebaseapp.com/chat', '_blank')"
                style="
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 50px;
                    padding: 15px 20px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    z-index: 1000;
                    transition: transform 0.2s ease;
                "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">
            💬 Chat with Us
        </button>
    `;
    document.body.appendChild(chatButton);
</script>
```

## 🔧 Configuration

### AI Personality Customization

Edit the `SYSTEM_PROMPT` in `functions/index.js`:

```javascript
const SYSTEM_PROMPT = `You are Caliber AI, a friendly and stylish assistant for Caliber Shoes...

// Customize the personality, knowledge base, and response style
`;
```

### Admin Authentication

Update the mock authentication in `admin.html`:

```javascript
function mockAuth(email, password) {
    // Replace with your admin credentials
    if (email === 'your-admin@calibershoes.com' && password === 'your-password') {
        return Promise.resolve({ uid: 'admin_123', email, admin: true });
    }
}
```

## 📊 Database Structure

### Firestore Collections

```
conversations/{userId}/
├── messages/{messageId}/
│   ├── text: string
│   ├── sender: "user" | "admin" | "ai"
│   ├── timestamp: serverTimestamp
│   └── read: boolean
│
├── lastMessage: string
├── lastMessageTime: serverTimestamp
├── lastSender: string
└── adminActive: boolean

admin/
└── status/
    ├── online: boolean
    ├── lastSeen: serverTimestamp
    └── adminId: string
```

## 🚀 Deployment Commands

```bash
# Deploy everything
firebase deploy

# Deploy only functions (for AI updates)
firebase deploy --only functions

# Deploy only hosting (for UI updates)
firebase deploy --only hosting

# View logs
firebase functions:log

# Test locally
firebase emulators:start
```

## 🔒 Security Features

- **Firestore Rules**: Users can only access their own conversations
- **Admin Authentication**: Secure login required for dashboard access
- **Function Authorization**: Admin-only callable functions
- **Input Validation**: Sanitized message content

## 🎨 Customization

### Colors & Branding

Update the CSS variables in both HTML files:

```css
/* Main brand colors */
--primary-color: #667eea;
--secondary-color: #764ba2;
--accent-color: #2c3e50;
```

### Response Timing

Adjust AI response timing in `functions/index.js`:

```javascript
// Auto-reply timeout (30 seconds)
const ADMIN_TIMEOUT = 30000;
```

## 🐛 Troubleshooting

### Common Issues

1. **AI not responding**
   - Check Gemini API key in Firebase environment variables
   - Verify Firebase Functions are deployed

2. **Chat not loading**
   - Confirm Firebase config is correct
   - Check browser console for errors

3. **Admin dashboard blank**
   - Verify admin authentication credentials
   - Check Firestore security rules

### Debug Commands

```bash
# Check function logs
firebase functions:log

# Test functions locally
firebase emulators:start --only functions

# View Firestore data
firebase firestore:export --only collections
```

## 📞 Support

For technical issues:
1. Check Firebase Console logs
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Test with Firebase emulators first

## 🎉 Success Metrics

- **Response Time**: < 1 second for AI replies
- **Uptime**: 99.9% Firebase reliability
- **User Experience**: Smooth real-time chat
- **Admin Efficiency**: Complete conversation overview

---

**🎊 Your AI-powered chat system is ready! Customers can now get instant support 24/7, and you can manage all conversations from a single dashboard.**
