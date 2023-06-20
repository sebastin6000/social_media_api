import post from "../models/postModel";
import User from "../models/userModel";

// CREATE A POST
export const createPost = async (request, responce) => {
  try {
    const { userID, description, picturePath } = request.body;
    const user = await User.findById(userID);
    const newPost = new Post({
      userID,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description: user.description,
      userPicturPath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    responce.status(201).json(post);
  } catch (error) {
    responce.status(404).json({ message: error.message });
  }
};

// READ
export const getFeedPosts = async (request, responce) => {
  try {
    const { userId } = request.params;
    const posts = await Post.find({ userId });
    responce.status(200).json(posts);
  } catch (error) {
    responce.status(404).json({ message: error.message });
  }
};

// UPDATE
export const likedPost = async (request, responce) => {
  try {
    const { id } = request.params;
    const { userId } = request.body;
    const post = Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    //SENDING RESPONCE
    responce.status(200).json(updatedPost);
  } catch (error) {
    responce.status(404).json({ message: error.message });
  }
};
