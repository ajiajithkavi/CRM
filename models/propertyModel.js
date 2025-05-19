const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },                   
  name: { type: String, required: true },                     
  address: { type: String, required: true },                   
  type: { type: String, enum: ['Apartment', 'Villa', 'Plot'], required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['Available', 'Sold', 'Booked'], default: 'Available' },
  listingType: { type: String, enum: ['Sale', 'Rent'], default: 'Sale' },  
  
  price: {
    amount: { type: Number, required: true },
    // currency: { type: String, default: 'INR' }
  },

  minPrice: { type: Number },                                
  maxPrice: { type: Number },                                 

  builderName: { type: String },                               

  propertyImage: [String],                                     

  bedrooms: { type: Number, default: 0 },                      
  bathrooms: { type: Number, default: 0 },                    
  squareFeet: { type: Number },                                
  units: { type: Number },                                     
  kitchen: { type: Number, default: 0 },                      

  carpetArea: { type: Number },                               
  sizes: { type: String },                                   

  phase: { type: String },                                  
  floor: { type: String },                                 
  mapViewLink: { type: String },                           
  videoURL: { type: String },                          

  principalInterest: { type: String },                  
  propertyTaxes: { type: Number },                       
  downPayment: { type: Number },                               
  homeownersInsurance: { type: Number },                  
  loanDetails: { type: String },    
  description: { type: String },                      

  features: [String],

  tenants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant'
  }],

  maintenanceRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maintenance'
  }],

  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Property || mongoose.model('Property', propertySchema);
