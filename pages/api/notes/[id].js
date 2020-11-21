import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const data = await Note.findById(id);

        if (!data) {
          return res
            .status(400)
            .json({ success: false, error: "id was not found" });
        }

        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "PUT":
      try {
        const data = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!data) {
          return res
            .status(400)
            .json({ success: false, error: "unable to update the note" });
        }

        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "DELETE":
      try {
        const deletedNote = await Note.deleteOne({ _id: id });

        if (!deletedNote) {
          return res
            .status(400)
            .json({ success: false, error: "unable to delete the note" });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "no method found" });
      break;
  }
};
