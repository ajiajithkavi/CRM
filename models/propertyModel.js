const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String },                                       
    address: { type: String },                   
    propertytype: { type: String, enum: ['Apartment', 'Villa', 'Plot'] },
   location: { type: String},
  
   listingType: { type: String, enum: ['Sale', 'Rent'], default: 'Sale' },  
  
   price: { type: Number},
  

    minPrice: { type: Number },                                
    maxPrice: { type: Number },                                 

    builderName: { type: String },                               

    propertyImage: [String],                                     

    bedrooms: { type: Number },                      
    bathrooms: { type: Number },                    
    squareFeet: { type: Number },                                
    units: { type: Number },                                     
    kitchen: { type: Number, default: 0 },                      

    carpetArea: { type: Number },                               
    sizes: { type: String },                                   

    phase: { type: String },                                  
    floor: { type: String },                                 
    mapViewLink: { type: String },                           
    videoURL: { type: String },
    keyAmenities: { type: String},                          

    principalInterest: { type: String },                  
    propertyTaxes: { type: Number },                       
    downPayment: { type: Number },                               
    homeownersInsurance: { type: Number }, 
   homePrice: { type: String } ,               
    loanDetails: { type: String },    
    description: { type: String },                      

 

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
