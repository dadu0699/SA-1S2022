const likeModel = require('../models/like.model');

const likeCounter = async (_req, res) => {
  try {
    const likes = await likeModel.countDocuments({});
    return res.status(201).json({
      code: 201,
      data: {
        message: 'Likes retrieved successfully',
        likes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      data: {
        message: 'Error getting likes',
        error,
      },
    });
  }
};

const newLike = async (req, res) => {
  const { uuid } = req.body;
  const newLike = new likeModel({ uuid });

  try {
    await newLike.save();
    return res.status(201).json({
      code: 201,
      data: {
        message: 'Like saved successfully',
        like: newLike,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      data: {
        message: 'Error saving like',
        error,
      },
    });
  }
};

const removeLike = async (req, res) => {
  const { uuid } = req.body;

  try {
    await likeModel.deleteOne({ uuid });
    return res.status(201).json({
      code: 201,
      data: {
        message: 'Like deleted successfully',
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      data: {
        message: 'Error deleting like',
        error,
      },
    });
  }
};

module.exports = { likeCounter, newLike, removeLike };
