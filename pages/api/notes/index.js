import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const data = await Note.find({}).sort({ _id: "desc" });
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "POST":
      try {
        const data = await Note.create(req.body);
        res.status(201).json({ success: true, data });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "no method found" });
      break;
  }
};
