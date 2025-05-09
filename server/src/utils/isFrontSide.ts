export default function isFrontSide(text: string): boolean {
  const lowerText = text.toLowerCase();

  const frontKeywords = [
    "government of india",
    "unique identification",
    "male",
    "female",
    "dob",
    "yob",
    "name",
    "year of birth",
    "aadhaar",
  ];

  const backKeywords = [
    "address",
    "c/o",
    "care of",
    "toll free",
    "enrollment",
    "update",
    "resident",
  ];

  const frontScore = frontKeywords.filter(word => lowerText.includes(word)).length;
  const backScore = backKeywords.filter(word => lowerText.includes(word)).length;

  return frontScore >= backScore; // or tweak to be more strict: `frontScore > 2 && backScore < 2`
}
