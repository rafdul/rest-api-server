const Testimonial = require('../models/testimonial.model');

const confirmation = { message: 'OK'};

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json(confirmation);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  try {
    const { author, text } = req.body;
    const tes = await(Testimonial.findById(req.params.id));
    if(tes) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text }});
      res.json(confirmation);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  try {
    const tes = await(Testimonial.findById(req.params.id));
    if(tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json(confirmation);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

  