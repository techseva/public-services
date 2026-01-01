### Firebase Firestore Database Structure

**Project Name:** Smart Public Services
**Database Type:** Firestore (Native Mode)
**Location:** Any (US/Asia/Europe)

---

#### Collection: `updates`

This collection should contain multiple documents. Each document represents a post.

| Field Name | Type | Description |
| :--- | :--- | :--- |
| **postTitle** | String | The main heading of the update. |
| **postImage** | String | Public URL of the image (Storage or external). |
| **postText** | String | Detailed content (Multiline supported). |
| **postUrl** | String | Link to be opened in WebView. |
| **postButtonText** | String | Text for the action button (e.g., "Apply Now"). |
| **postDate** | Timestamp | Current date/time for sorting. |

---

#### Security Rules (Production Release):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /updates/{document=**} {
      allow read: if true;
      allow write: if false; // Only manageable via Firebase Console or Admin SDK
    }
  }
}
```

#### Firestore Data Example Entry:

- **postTitle**: "New Housing Scheme for Public 2026"
- **postImage**: "https://firebasestorage.googleapis.com/.../house.jpg"
- **postText**: "The government has announced a new housing scheme. \n\nKey Benefits:\n- Low Interest\n- Easy Installments\n- Online Application."
- **postUrl**: "https://publicservices.gov.in/housing"
- **postButtonText**: "Apply Online"
- **postDate**: January 1, 2026 at 10:00:00 AM UTC+5:30
