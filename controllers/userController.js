const User = require('../models/user');

exports.updateUser = async (req, res) => {
    const { user_uid: userId } = req.params;
    const updates = req.body;

    try {
        const affectedRows = await User.updateUser(userId, updates);
        if (affectedRows === 0) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    const { user_uid:userId } = req.params;

    try {
        const affectedRows = await User.deleteUser(userId);
        if (affectedRows === 0) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
