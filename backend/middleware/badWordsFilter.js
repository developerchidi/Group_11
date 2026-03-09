const fs = require('fs');
const path = require('path');

// danh sách từ cấm (có thể mở rộng theo thời gian)
let badWords = [];
try {
  const data = fs.readFileSync(path.join(__dirname, 'badWords.json'), 'utf-8');
  badWords = JSON.parse(data);
} catch (err) {
  console.warn('Không thể đọc danh sách bad words, sử dụng mảng rỗng');
}

function containsBadWord(text) {
  if (!text || typeof text !== 'string') return false;
  const lower = text.toLowerCase();
  return badWords.some(word => lower.includes(word));
}

module.exports = function badWordsMiddleware(req, res, next) {
  const { content } = req.body;
  if (containsBadWord(content)) {
    const err = new Error('Nội dung chứa từ không hợp lệ');
    err.status = 400;
    return next(err);
  }
  next();
};
