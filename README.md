# Messaging RESTful API

RESTful API cho tin nhắn với Node.js + Express + MongoDB theo chuẩn MVC.

## Cấu trúc thư mục
```
├── config/           # Database config
├── controllers/      # Business logic
├── middleware/       # Auth, error handler
├── models/           # Mongoose schemas
├── routes/           # Express routes
├── services/         # Service layer
├── app.js           # Express app
└── server.js        # Entry point
```

## API Endpoints (Auth required)

### 1. Lấy tin nhắn giữa 2 user
```
GET /api/messages/:userID
```
**Query**: Messages giữa current user và userID, sort theo thời gian.

**Response**:
```json
{
  "success": true,
  "data": [...]
}
```

### 2. Gửi tin nhắn
```
POST /api/messages
```
**Body**:
```json
{
  "to": "userID",
  "text": "Hello" // or
  "file": "/path/to/file"
}
```

### 3. Lấy danh sách hội thoại
```
GET /api/messages
```
**Response**: Tin nhắn cuối cùng của mỗi cuộc trò chuyện.

## Setup

1. Copy `.env.example` → `.env` và config `MONGO_URI`
2. `npm install`
3. `npm run dev`

## Test (hardcoded currentUser ID)

Cần có User documents với ObjectId `507f1f77bcf86cd799439011`.

**Auth stub** trong `middleware/auth.js` - replace với JWT thực tế.

