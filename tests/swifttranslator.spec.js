const { test, expect } = require("@playwright/test");

const cases = [
 // --- POSITIVE FUNCTIONAL: SHORT INPUTS (S ≤ 30) ---
  { id: "Pos_Fun_0001", name: "Short daily greeting", input: "suba upandhinayak machan", expected: "සුබ උපන්දිනයක් මචන්" },
  { id: "Pos_Fun_0002", name: "Mixed Singlish + English greeting", input: "good morning yaluvaa", expected: "good morning යලුවා" },
  { id: "Pos_Fun_0003", name: "Short request - question", input: "mata vathura tikak dhenavadha?", expected: "මට වතුර ටිකක් දෙනවද?" },
  { id: "Pos_Fun_0004", name: "Informal request", input: "oya parissamin yanna puthaa", expected: "ඔය පරිස්සමින් යන්න පුතා" },
  { id: "Pos_Fun_0005", name: "Family request question", input: "ammee bath tikak bedhala dhenavadha?", expected: "අම්මේ බත් ටිකක් බෙදල දෙනවද?" },
  { id: "Pos_Fun_0006", name: "Real-time update - Affection", input: "mama eyaata aadhare karanavaa", expected: "මම එයාට ආදරෙ කරනවා" },
  { id: "Pos_Fun_0007", name: "Real-time update - Mixed English", input: "api heta day out ekak yamudha?", expected: "අපි හෙට day out එකක් යමුද?" },
  { id: "Pos_Fun_0008", name: "Mixed English - Exam", input: "hodhata exam karaganna", expected: "හොදට exam කරගන්න" },
  { id: "Pos_Fun_0009", name: "Trip planning question", input: "api heta gamanak yamudha?", expected: "අපි හෙට ගමනක් යමුද?" },
  { id: "Pos_Fun_0010", name: "Mixed English - Drink", input: "api heta drink ekak gannawa", expected: "අපි හෙට drink එකක් ගන්නව" },
  { id: "Pos_Fun_0011", name: "Mixed English - Assignment question", input: "oyaa assignment eka karala ivaradha?", expected: "ඔයා assignment එක කරල ඉවරද?" },
  { id: "Pos_Fun_0012", name: "Request with question mark", input: "mama theekak bonna yanava oyath enavadha?", expected: "මම තේකක් බොන්න යනව ඔයත් එනවද?" },
  { id: "Pos_Fun_0013", name: "Mixed English - Success wish", input: "assignment ekata hodhata lakunu hambaveevaa!", expected: "assignment එකට හොදට ලකුනු හම්බවේවා!" },

  // --- POSITIVE FUNCTIONAL: MEDIUM INPUTS (M 31–303) ---
  { id: "Pos_Fun_0014", name: "Daily routine narrative", input: "Morning time mama alarm eka off karala thava podi sleep ekak gannava. Amma kitchen eke idhala “hari late venava” kiyala shout karanava. Mama hurry ikmanata ready unaa, but phone eka balala messages check karalaa tea eka bonna gaman, adha day eka kohomadha yanne kiyala mama hithuva.", expected: "Morning time මම alarm එක off කරල තව පොඩි sleep එකක් ගන්නව. අම්ම kitchen eke ඉදල “හරි late වෙනව” කියල shout කරනව. මම hurry ඉක්මනට ready උනා, but phone එක බලල messages check කරලා tea එක බොන්න ගමන්, අද day එක කොහොමද යන්නෙ කියල මම හිතුව." },
  { id: "Pos_Fun_0015", name: "Bus stand description", input: "Bus stand eka hari crowded, full rasne. minissu thallu karanava, but mokak karanna oonee . Bus eka avoth seat ekak hambenna luck ekata. Conductor aiya haiyen shout karanava. tharuu laga indala music ahagena yanne podi calm feeling ekak ekka", expected: "Bus stand එක හරි crowded, full රස්නෙ. මිනිස්සු තල්ලු කරනව, but මොකක් කරන්න ඕනේ . Bus එක අවොත් seat එකක් හම්බෙන්න luck එකට. Conductor ඓය හෛයෙන් shout කරනව. තරූ ලග ඉන්ඩල music අහගෙන යන්නෙ පොඩි calm feeling එකක් එක්ක" },
  { id: "Pos_Fun_0016", name: "Classroom/School narrative", input: "Classroom eke teachers serious vidhihakta lesson karanava. Back bench eke machanla jokes kiyala fun gannava. Sir ta ahu venne nathuva manage karanava. Interval eka avoth, hamoma kade ta duvanava, bun, isso vade, coke aragena bonavaa sellam karanavaa ", expected: "Classroom eke teachers serious විදිහක්ට lesson කරනව. Back බෙන්ච් eke මචන්ල jokes කියල fun ගන්නව. Sir ට අහු වෙන්නෙ නතුව manage කරනව. Interval එක අවොත්, හමොම කඩෙ ට ඩුවනව, bun, ඉස්සො වඩෙ, coke අරගෙන බොනවා සෙල්ලම් කරනවා " },
  { id: "Pos_Fun_0017", name: "After school routine", input: "School ivara vela gedhara enne hari tired vidihakta. Bag eka dhaalaa, face eka wash karala, lunch eka gannavaa. Amma questions godak ahanava, but mama kooma hari uththara denavaa. chuuti rest ekak gaththama body eka relax venava", expected: "School ඉවර වෙල ගෙදර එන්නෙ හරි tired විඩිහක්ට. Bag එක දාලා, face එක wash කරල, lunch එක ගන්නවා. අම්ම questions ගොඩක් අහනව, but මම කෝම හරි උත්තර ඩෙනවා. චූටි rest එකක් ගත්තම body එක relax වෙනව" },
  { id: "Pos_Fun_0018", name: "Evening nature/Neighbors", input: "Evening ekee poddak eliyata gihin monava hari snacks gannavaa . Breeze eka hari lassanata penavaa . Neighbors godaak haiyen kathakaranavaa, podi kattiya cricket gahanava. Phone eka ain karala nature eka enjoy karanava. Me vage quiet moments peace eka kiyala hithenava. ", expected: "Evening එකේ පොඩ්ඩක් එලියට ගිහින් මොනව හරි snacks ගන්නවා . Breeze එක හරි ලස්සනට පෙනවා . Neighbors ගොඩාක් හෛයෙන් කතකරනවා, පොඩි කට්ටිය cricket ගහනව. Phone එක ඓන් කරල nature එක enjoy කරනව. මෙ වගෙ quiet moments peace එක කියල හිතෙනව. " },
  { id: "Pos_Fun_0019", name: "Rainy day atmosphere", input: "Sudden rain eka patan gannakota mood eka change venava. Roof eke sound eka music vage. Amma redhi tika ganna dhuvanava. Power cut ekak avoth, candle light ekedhi kattiya kathandhara kiyanna patan gannava. Eeka harima simple but hari cozy feeling ekak.", expected: "Sudden rain එක පටන් ගන්නකොට mood එක change වෙනව. Roof eke sound එක music වගෙ. අම්ම රෙදි ටික ගන්න දුවනව. Power cut එකක් අවොත්, candle light එකෙදි කට්ටිය කතන්දර කියන්න පටන් ගන්නව. එඑක හරිම simple but හරි cozy feeling එකක්." },
  { id: "Pos_Fun_0020", name: "Future thoughts/Anxiety", input: "Sometimes future eka hithanakota podi bayak enava. Job, money, life – okkoma prashna. thaththa kiyanava “himiita me deval okkoma hari yanava ” kiyala. Ehema ahanakota mind eka calm venava. Pressure thibbath hope eka thiyenava. ", expected: "Sometimes future එක හිතනකොට පොඩි බයක් එනව. Job, money, life – ඔක්කොම ප්‍රශ්න. තත්ත කියනව “හිමීට මෙ ඩෙවල් ඔක්කොම හරි යනව ” කියල. එහෙම අහනකොට mind එක calm වෙනව. Pressure තිබ්බත් hope එක තියෙනව. " },
  { id: "Pos_Fun_0021", name: "WhatsApp group/Friendship", input: "yaluvange WhatsApp group eka nam full noise. Memes, jokes, voice notes nonstop. mona mood ekak thibboth, one message ekakin hinavak ekak enava. Lankan friendship eka hari special. Mona problems thibbath, “chill ban” kiyala sanasavanavaa.", expected: "යලුවන්ගෙ WhatsApp group එක නම් full noise. Memes, jokes, voice notes nonstop. මොන mood එකක් තිබ්බොත්, one message එකකින් හිනවක් එකක් එනව. Lankan friendship එක හරි special. මොන problems තිබ්බත්, “chill බන්” කියල සනසවනවා." },
  { id: "Pos_Fun_0022", name: "Night study session", input: "Mama night time study karanna try karanava, but focus eka ganna ba hariyata. Book eka open, but thoughts everywhere. Still, mama effort ekak dhaanna hadhanava. Exams laga nisa. Study eken passe music thamaa relax venne best reward eka. ", expected: "මම night time study කරන්න try කරනව, but focus එක ගන්න බ හරියට. Book එක open, but thoughts everywhere. Still, මම effort එකක් දාන්න හදනව. Exams ලග නිස. Study එකෙන් පස්සෙ music තමා relax වෙන්නෙ best reward එක. " },
  { id: "Pos_Fun_0023", name: "Weekend sleep/Relatives", input: "Weekend eka nam dream ekak vagee . dhaval venakan nidhaganna puluvan. Amma sadhdhen kiyala kiyala passe udhe kama eka dhenava. Sometimes relatives gedhara yanava, tea bonava, stories kiyala hinaa velaa relax venavaa. Time eka hari fast yanne.", expected: "Weekend එක නම් dream එකක් වගේ . දවල් වෙනකන් නිදගන්න පුලුවන්. අම්ම සද්දෙන් කියල කියල පස්සෙ උදෙ කම එක දෙනව. Sometimes relatives ගෙදර යනව, tea බොනව, stories කියල හිනා වෙලා relax වෙනවා. Time එක හරි fast යන්නෙ." },
  { id: "Pos_Fun_0024", name: "Lankan life/Kindness", input: "Lankan life eka simple but rasnei godaak. minissu hinaa velaa innee, help karanava, oona kenek “machan” kiyala kathakaranava. duppath unath, heart eka rich. Small kindnesses thama mee ratata hari lassanai karanne ", expected: "Lankan life එක simple but රස්නේ ගොඩාක්. මිනිස්සු හිනා වෙලා ඉන්නේ, help කරනව, ඕන කෙනෙක් “මචන්” කියල කතකරනව. ඩුප්පත් උනත්, heart එක rich. Small kindnesses තම මේ රටට හරි ලස්සනෛ කරන්නේ " },
  { id: "Pos_Fun_0025", name: "Burnout/Mental health", input: "eka dhigatama vaeda vaeda kisima nidhahasak naee oluvata naee. mata nam epaa velaa thiyenne me jiivithaya sathutak kiyala dheyak aeththema naa monavaa karannadha kiyala mata therenne nae kohoma hari mama mQQ venuven velavak ven karagena sathutin life eka gatha karanna oone.", expected: "එක දිගටම වැඩ වැඩ කිසිම නිදහසක් නෑ ඔලුවට නෑ. මට නම් එපා වෙලා තියෙන්නෙ මෙ ජීවිතය සතුටක් කියල දෙයක් ඇත්තෙම නා මොනවා කරන්නද කියල මට තෙරෙන්නෙ නැ කොහොම හරි මම මං වෙනුවෙන් වෙලවක් වෙන් කරගෙන සතුටින් life එක ගත කරන්න ඕනෙ." },

  // --- NEGATIVE FUNCTIONAL: FAIL CASES (Issues identified in TC ID.docx) ---
  { id: "Ne_Fun_0001", name: "Phonetic 'W' issue", input: "mehaatta hodhatama wahinawa adha", expected: "මෙහාට්ට හොදටම වහිනවා අද" },
  { id: "Ne_Fun_0002", name: "Insult mistranslated as affection", input: "eya thiyenna denawa kenekuta", expected: "ඔහු/ඇය කෙනෙකුට හිස දෙනවා" },
  { id: "Ne_Fun_0003", name: "Negation omission", input: "eya anith ayata harida denna næ", expected: "ඔහු/ඇය අනෙක් අයට හරිද දෙන්නේ නැහැ" },
  { id: "Ne_Fun_0004", name: "Emotion antonym (Negative to Positive)", input: "eya hari dosa behetu weyi", expected: "ඔහු/ඇය ඉතා දොස බෙහෙතුයි" },
  { id: "Ne_Fun_0005", name: "Polarity reversal (Trust issue)", input: "eya ayata minissu wisthara karanawa", expected: "ඔහු/ඇය අයව මිනිස්සුන්ට විශ්වාස කරන්නේ නැහැ" },
  { id: "Ne_Fun_0006", name: "Adverb accuracy (Nothing vs Everything)", input: "eya hithanne kisima deyak næ", expected: "ඔහු/ඇය කිසිම දෙයක් හිතන්නේ නැහැ" },
  { id: "Ne_Fun_0007", name: "Incorrect negation handling", input: "mama adha ohuwa maranawaa", expected: "මම අද ඔහුව මරනවා" },
  { id: "Ne_Fun_0008", name: "Trait flip (Insult to Respect)", input: "eya anith ayata apahasui", expected: "ඔහු/ඇය අනෙකුන්ට අපහාසයි" },
  { id: "Ne_Fun_0009", name: "Context awareness failure", input: "eya balayen nedda danne", expected: "ඔහු/ඇය බලයෙන් දන්නේ නැහැ" },
  { id: "Ne_Fun_0010", name: "Descriptor reversal (Distant vs Close)", input: "eya samahara welaata durathai", expected: "ඔහු/ඇය සමහරු වෙලාවට දුරටයි" },
  { id: "Ne_Fun_0011", name: "Adjective reversal (Lazy vs Clever)", input: "eya lazy widihata weda karanawa", expected: "ඔහු/ඇය කම්මැලි ලෙස වැඩ කරනවා" },

  // --- UI/USABILITY FLOW ---
  { id: "Pos_UI_0001", name: "Real-time conversion usability", input: "panduka adha havasa kadee yanava paan aragena enna", expected: "පන්ඩුක අද හවස කඩේ යනව පාන් අරගෙන එන්න" }
];

test.describe("SwiftTranslator - Positive functional tests", () => {
  for (const tc of cases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto("https://www.swifttranslator.com/");

      const inputBox = page.getByRole("textbox", {
        name: "Input Your Singlish Text Here.",
      });

      await inputBox.fill(tc.input);

      await expect(page.getByText(tc.expected)).toBeVisible();
    });
  }
});