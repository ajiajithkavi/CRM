const mongoose = require('mongoose');

// House 
const houseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  areaSqFt: { type: Number, required: true },
  type: { type: String, enum: ['1BHK', '2BHK', '3BHK', '4BHK', 'Villa', 'Commercial'], required: true },
  price: { type: Number, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  photos: [{ type: String }],
  videos: [{ type: String }],
  description: { type: String }
});

// Floor 
const floorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  houses: [houseSchema]
});

// Phase 
const phaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  floors: [floorSchema]
});

// Villa
const villaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  houses: [houseSchema]
});

// Project 
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Apartment', 'Villa', 'Commercial'], required: true },
  location: { type: String, required: true },
  phases: [phaseSchema],
  villas: [villaSchema]

});

// Builder 
const builderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String },
  phone: { type: String, required: true, match: /^\d{10}$/ },
  projects: [projectSchema],
  createdAt: { type: Date, default: Date.now }
});

const Builder = mongoose.model('Builder', builderSchema);
module.exports = Builder;
