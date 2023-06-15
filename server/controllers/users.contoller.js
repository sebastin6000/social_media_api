import User from "../models/userModel";

// READ
export const getUser = async (request, responce) => {
  try {
    // grabing the id
    const { id } = request.prams;
    // find the user in the database with the id
    const user = await User.findById(id);
    // sending the request user to the client
    responce.status(200).json(user);
  } catch (error) {
    responce.status(404).json({ message: error.message });
  }
};

export const getUserFriends = async (request, responce) => {
  try {
    // grabing the id
    const { id } = request.prams;
    // find the user in the database with the id
    const user = await User.findById(id);
    //
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    // formatting for the front end
    const formattedFriends = friends.map(
      ({ __id, firstName, lastName, occupation, location, profilePath }) => {
        return { __id, firstName, lastName, occupation, location, profilePath };
      }
    );
    // sending the responce to the client
    responce.status(200).json(formattedFriends);
  } catch (error) {
    responce.status(404).json({ message: error.message });
  }
};

// UPDATE
export const addRemoveFriend = async (request, responce) => {
  try {
    // grabing user id and friend id
    const { id, friendId } = request.prams;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    //
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    // formatting the data
    const formattedFriends = friends.map(
      ({ __id, firstName, lastName, occupation, location, profilePath }) => {
        return { __id, firstName, lastName, occupation, location, profilePath };
      }
    );

    // sending the responce to the client
    responce.status(200).json(formattedFriends);
  } catch (error) {
    responce.status(404).json({ message: error.message });
  }
};
