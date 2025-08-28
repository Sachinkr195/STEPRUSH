
import User from "../models/User.js";




// multer for image upload


// ✅ Get profile by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update profile (profileImg + address)
router.put("/:id", upload.single("profileImg"), async (req, res) => {
  try {
    let updateData = {};

    // handle address (JSON sent from frontend)
    if (req.body.address) {
      updateData.address = JSON.parse(req.body.address);
    }

    // handle profile image
    if (req.file) {
      const imgBase64 = req.file.buffer.toString("base64");
      updateData.profileImg = `data:image/png;base64,${imgBase64}`;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
