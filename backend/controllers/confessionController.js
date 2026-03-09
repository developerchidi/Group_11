const Confession = require('../models/Confession');

// trả về tất cả confession, có thể mở rộng pagination/sorting
async function getAllConfessions(req, res, next) {
  try {
    // lựa chọn chỉ trả về trường cần thiết để giảm tải mạng
    const confessions = await Confession.find()
      .sort({ createdAt: -1 })
      .select('content author_alias color votes createdAt')
      .lean();

    res.json(confessions);
  } catch (err) {
    next(err);
  }
}

// tạo confession mới
async function createConfession(req, res, next) {
  try {
    const { content, author_alias, author_id, color } = req.body;

    // kiểm tra dữ liệu cơ bản
    if (!content || !author_alias || !author_id) {
      const error = new Error('Missing required fields');
      error.status = 400;
      throw error;
    }

    const confession = new Confession({
      content,
      author_alias,
      author_id,
      color,
    });

    const saved = await confession.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllConfessions,
  createConfession,
};
