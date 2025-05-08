export default function extractAddress(rawText: string): string {
    let address = rawText;
  

    address = address.replace(/[~“”'"`;:!@#$%^&*_=+\[\]{}<>\\|₹¥•™]/g, ' ');
  

    address = address.replace(/[^a-zA-Z0-9,\.\s/]/g, ' ');
  
 
    address = address.replace(/\s+/g, ' ').trim();
  
 
    const garbageWords = [
      "Ce", "EEE", "Ul", "os", "Hyiohe",'gepsy', "Treva", "te", "SHAT", "ha", "HRS", "FA", 
      "g", "omen", "me", "Ak", "gues", "Ee", "Gi", "ihe", "phi", "inds", "oT", "¥","ores","iinds"
    ];
  
    garbageWords.forEach(noise => {
      const pattern = new RegExp(`\\b${noise}\\b`, "gi");
      address = address.replace(pattern, '');
    });
  
    
    address = address.replace(/\b(po|dist|kerala|malappuram|moonniyur)\b/gi, match => match.toUpperCase());
  
    address = address.replace(/\b(HOUSE|P\.O\.?|DIST|VILLAGE|ROAD|STREET|NAGAR|WARD|COLONY)\b/gi, match => match + ',');
  

    address = address.replace(/\bS\/0\b/gi, "S/O");
  
   
    address = address.replace(/\s+/g, ' ').replace(/ ,/g, ',').trim();
  
    return address;
  }
  