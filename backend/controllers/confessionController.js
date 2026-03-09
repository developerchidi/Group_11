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

// vote cho confession
async function voteConfession(req, res, next) {
  try {
    const { id } = req.params;
    const { vote, userId } = req.body;

    if (![1, -1].includes(vote)) {
      const err = new Error('Invalid vote value');
      err.status = 400;
      throw err;
    }

    const confession = await Confession.findById(id);
    if (!confession) {
      const err = new Error('Confession not found');
      err.status = 404;
      throw err;
    }

    // nếu user đã vote rồi thì bỏ qua hoặc có thể cập nhật
    if (confession.voted_users.includes(userId)) {
      // không cho phép vote lại
      return res.status(200).json({ votes: confession.votes });
    }

    confession.votes += vote;
    confession.voted_users.push(userId);
    await confession.save();

    res.json({ votes: confession.votes });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllConfessions,
  createConfession,
  voteConfession,
};
