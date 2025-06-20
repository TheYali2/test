import express from 'express';
const app = express();

const countries = [
  { name: "אפגניסטן", code: "AF" }, { name: "אלבניה", code: "AL" }, { name: "אלג'יריה", code: "DZ" },
  { name: "אנדורה", code: "AD" }, { name: "אנגולה", code: "AO" }, { name: "ארגנטינה", code: "AR" },
  { name: "ארמניה", code: "AM" }, { name: "אוסטרליה", code: "AU" }, { name: "אוסטריה", code: "AT" },
  { name: "אזרבייג'אן", code: "AZ" }, { name: "בהאמס", code: "BS" }, { name: "בחריין", code: "BH" },
  { name: "בנגלדש", code: "BD" }, { name: "בארבדוס", code: "BB" }, { name: "בלארוס", code: "BY" },
  { name: "בלגיה", code: "BE" }, { name: "בליז", code: "BZ" }, { name: "בנין", code: "BJ" },
  { name: "בהוטן", code: "BT" }, { name: "בוליביה", code: "BO" }, { name: "בוסניה והרצגובינה", code: "BA" },
  { name: "בוטסואנה", code: "BW" }, { name: "ברזיל", code: "BR" }, { name: "ברוניי", code: "BN" },
  { name: "בולגריה", code: "BG" }, { name: "בורקינה פאסו", code: "BF" }, { name: "בורונדי", code: "BI" },
  { name: "קמבודיה", code: "KH" }, { name: "קמרון", code: "CM" }, { name: "קנדה", code: "CA" },
  { name: "צ'אד", code: "TD" }, { name: "צ'ילה", code: "CL" }, { name: "סין", code: "CN" },
  { name: "קולומביה", code: "CO" }, { name: "קומורו", code: "KM" }, { name: "קונגו", code: "CG" },
  { name: "קוסטה ריקה", code: "CR" }, { name: "קרואטיה", code: "HR" }, { name: "קובה", code: "CU" },
  { name: "קפריסין", code: "CY" }, { name: "צ'כיה", code: "CZ" }, { name: "דנמרק", code: "DK" },
  { name: "ג'יבוטי", code: "DJ" }, { name: "דומיניקה", code: "DM" }, { name: "הרפובליקה הדומיניקנית", code: "DO" },
  { name: "אקוודור", code: "EC" }, { name: "מצרים", code: "EG" }, { name: "אל סלוודור", code: "SV" },
  { name: "גינאה המשוונית", code: "GQ" }, { name: "אריתראה", code: "ER" }, { name: "אסטוניה", code: "EE" },
  { name: "סווזילנד", code: "SZ" }, { name: "אתיופיה", code: "ET" }, { name: "פיג'י", code: "FJ" },
  { name: "פינלנד", code: "FI" }, { name: "צרפת", code: "FR" }, { name: "גבון", code: "GA" },
  { name: "גםביה", code: "GM" }, { name: "גאורגיה", code: "GE" }, { name: "גרמניה", code: "DE" },
  { name: "גאנה", code: "GH" }, { name: "יוון", code: "GR" }, { name: "גואטמלה", code: "GT" },
  { name: "גינאה", code: "GN" }, { name: "גיאנה", code: "GY" }, { name: "האיטי", code: "HT" },
  { name: "הונדורס", code: "HN" }, { name: "הונגריה", code: "HU" }, { name: "איסלנד", code: "IS" },
  { name: "הודו", code: "IN" }, { name: "אינדונזיה", code: "ID" }, { name: "איראן", code: "IR" },
  { name: "עיראק", code: "IQ" }, { name: "אירלנד", code: "IE" }, { name: "ישראל", code: "IL" },
  { name: "איטליה", code: "IT" }, { name: "ג'מייקה", code: "JM" }, { name: "יפן", code: "JP" },
  { name: "ירדן", code: "JO" }, { name: "קזחסטן", code: "KZ" }, { name: "קניה", code: "KE" },
  { name: "כווית", code: "KW" }, { name: "קירגיזסטן", code: "KG" }, { name: "לאוס", code: "LA" },
  { name: "לטביה", code: "LV" }, { name: "לבנון", code: "LB" }, { name: "ליבריה", code: "LR" },
  { name: "לוב", code: "LY" }, { name: "ליכטנשטיין", code: "LI" }, { name: "ליטא", code: "LT" },
  { name: "לוקסמבורג", code: "LU" }, { name: "מדגסקר", code: "MG" }, { name: "מאלי", code: "ML" },
  { name: "מלזיה", code: "MY" }, { name: "מלטה", code: "MT" }, { name: "מאוריטניה", code: "MR" },
  { name: "מאוריציוס", code: "MU" }, { name: "מקסיקו", code: "MX" }, { name: "מולדובה", code: "MD" },
  { name: "מונקו", code: "MC" }, { name: "מונגוליה", code: "MN" }, { name: "מונטנגרו", code: "ME" },
  { name: "מרוקו", code: "MA" }, { name: "מוזמביק", code: "MZ" }, { name: "מיאנמר", code: "MM" },
  { name: "נמיביה", code: "NA" }, { name: "נפאל", code: "NP" }, { name: "הולנד", code: "NL" },
  { name: "ניו זילנד", code: "NZ" }, { name: "ניקרגואה", code: "NI" }, { name: "ניגריה", code: "NG" },
  { name: "צפון קוריאה", code: "KP" }, { name: "צפון מקדוניה", code: "MK" }, { name: "נורווגיה", code: "NO" },
  { name: "עומן", code: "OM" }, { name: "פקיסטן", code: "PK" }, { name: "פלסטין", code: "PS" },
  { name: "פנמה", code: "PA" }, { name: "פפואה גינאה החדשה", code: "PG" }, { name: "פרגוואי", code: "PY" },
  { name: "פרו", code: "PE" }, { name: "הפיליפינים", code: "PH" }, { name: "פולין", code: "PL" },
  { name: "פורטוגל", code: "PT" }, { name: "קטר", code: "QA" }, { name: "רומניה", code: "RO" },
  { name: "רוסיה", code: "RU" }, { name: "רואנדה", code: "RW" }, { name: "ערב הסעודית", code: "SA" },
  { name: "סנגל", code: "SN" }, { name: "סרביה", code: "RS" }, { name: "סינגפור", code: "SG" },
  { name: "סלובקיה", code: "SK" }, { name: "סלובניה", code: "SI" }, { name: "סומליה", code: "SO" },
  { name: "דרום אפריקה", code: "ZA" }, { name: "דרום קוריאה", code: "KR" }, { name: "ספרד", code: "ES" },
  { name: "סרי לנקה", code: "LK" }, { name: "סודן", code: "SD" }, { name: "שבדיה", code: "SE" },
  { name: "שווייץ", code: "CH" }, { name: "סוריה", code: "SY" }, { name: "טאיוואן", code: "TW" },
  { name: "טאג'יקיסטן", code: "TJ" }, { name: "טנזניה", code: "TZ" }, { name: "תאילנד", code: "TH" },
  { name: "תוניסיה", code: "TN" }, { name: "טורקיה", code: "TR" }, { name: "טורkmenistan", code: "TM" },
  { name: "אוגנדה", code: "UG" }, { name: "אוקראינה", code: "UA" }, { name: "איחוד האמירויות הערביות", code: "AE" },
  { name: "הממלכה המאוחדת", code: "GB" }, { name: "ארצות הברית", code: "US" }, { name: "אורוגוואי", code: "UY" },
  { name: "אוזבקיסטן", code: "UZ" }, { name: "ונצואלה", code: "VE" }, { name: "וייטנאם", code: "VN" },
  { name: "תימן", code: "YE" }, { name: "זמביה", code: "ZM" }, { name: "זימבבואה", code: "ZW" }
];

app.get('/', (req, res) => {
  const random = countries[Math.floor(Math.random() * countries.length)];
  const flag = `https://flagcdn.com/w320/${random.code.toLowerCase()}.png`;
  res.json({
    name: random.name,
    code: random.code,
    flag: flag
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API רץ על פורט ${PORT}`));
