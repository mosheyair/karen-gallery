const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// ✅ Serve static files like upload.html
app.use(express.static(__dirname));


// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Save files in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique name with original extension
  }
});
const upload = multer({ storage: storage });

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ message: 'Image uploaded!', filePath: `/uploads/${req.file.filename}` });
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Karen backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
