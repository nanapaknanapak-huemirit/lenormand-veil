export const spreads = [
  {
    slug: "daily-card",
    order: 1,
    icon: "sun",
    layout: "single",
    count: 1,
    focusIndex: 0,
    adviceIndex: 0,
    outcomeIndex: 0,
    content: {
      en: {
        name: "Daily Card",
        short: "One card to set the tone for today.",
        lede: "A single card for the day: a theme, an invitation, or a gentle warning.",
        intro:
          "A single Lenormand card is a concise message for the day. Read it as a theme, an invitation, or a warning, then notice where it shows up in your day.",
        note:
          "The daily card is drawn from the full 36-card deck and is always read upright.",
        positions: [
          {
            key: "today",
            name: "Today's message",
            meaning: "The theme, energy, or invitation for the day."
          }
        ]
      },
      he: {
        name: "קלף יומי",
        short: "קלף אחד שקובע את הטון להיום.",
        lede: "קלף אחד ליום: נושא, הזמנה או אזהרה עדינה.",
        intro:
          "קלף לנורמנד בודד הוא מסר תמציתי ליום. קראו אותו כנושא, כהזמנה או כאזהרה, ואז שימו לב היכן הוא מופיע ביום שלכם.",
        note: "הקלף היומי נשלף מתוך החפיסה המלאה של 36 הקלפים ונקרא תמיד בכיוון ישר.",
        positions: [
          {
            key: "today",
            name: "המסר של היום",
            meaning: "הנושא, האנרגיה או ההזמנה של היום."
          }
        ]
      }
    }
  },
  {
    slug: "three-cards",
    order: 2,
    icon: "crossroads",
    layout: "line",
    count: 3,
    focusIndex: 1,
    adviceIndex: 1,
    outcomeIndex: 2,
    content: {
      en: {
        name: "Three Cards",
        short: "Past, present, and future in a simple line.",
        lede: "The classic line: where you come from, where you are, and where you are going.",
        intro:
          "The three-card line is the classic Lenormand spread. Read it left to right as a small story, with the first card as the root, the second as the present, and the third as what is developing.",
        note:
          "Mirror the first and third cards for extra insight: they show two sides of the same movement.",
        positions: [
          {
            key: "past",
            name: "Past",
            meaning: "Roots, background, and what led here."
          },
          {
            key: "present",
            name: "Present",
            meaning: "The current situation and your role in it."
          },
          {
            key: "future",
            name: "Future",
            meaning: "What is developing and where it leads."
          }
        ]
      },
      he: {
        name: "שלושה קלפים",
        short: "עבר, הווה ועתיד בשורה פשוטה.",
        lede: "השורה הקלאסית: מהיכן באתם, איפה אתם ולאן אתם הולכים.",
        intro:
          "שורת שלושת הקלפים היא הפריסה הקלאסית של לנורמנד. קראו אותה משמאל לימין כסיפור קטן, כשהקלף הראשון הוא השורש, השני ההווה והשלישי מה שמתפתח.",
        note:
          "הצליבו את הקלף הראשון והשלישי לתובנה נוספת: הם מראים שני צדדים של אותה תנועה.",
        positions: [
          {
            key: "past",
            name: "עבר",
            meaning: "שורשים, רקע ומה שהוביל לכאן."
          },
          {
            key: "present",
            name: "הווה",
            meaning: "המצב הנוכחי והתפקיד שלכם בו."
          },
          {
            key: "future",
            name: "עתיד",
            meaning: "מה שמתפתח ולאן זה מוביל."
          }
        ]
      }
    }
  },
  {
    slug: "five-cards",
    order: 3,
    icon: "star",
    layout: "line",
    count: 5,
    focusIndex: 2,
    adviceIndex: 3,
    outcomeIndex: 4,
    content: {
      en: {
        name: "Five Cards",
        short: "Situation, challenge, focus, advice, and outcome.",
        lede: "A fuller answer than three cards, with a clear centre and a practical next step.",
        intro:
          "The five-card line gives a fuller answer than three cards. The centre card is the focus of the reading; the cards on either side show the forces around it, and the final card shows where things are heading.",
        note:
          "Mirror card 1 with card 5 and card 2 with card 4 for extra insight into the forces around the centre.",
        positions: [
          {
            key: "situation",
            name: "Situation",
            meaning: "What is really going on."
          },
          {
            key: "challenge",
            name: "Challenge",
            meaning: "What complicates or resists."
          },
          {
            key: "focus",
            name: "Focus",
            meaning: "The heart of the matter."
          },
          {
            key: "advice",
            name: "Advice",
            meaning: "What to do next."
          },
          {
            key: "outcome",
            name: "Outcome",
            meaning: "Where the current path leads."
          }
        ]
      },
      he: {
        name: "חמישה קלפים",
        short: "מצב, אתגר, מוקד, עצה ותוצאה.",
        lede: "תשובה מלאה יותר משלושה קלפים, עם מרכז ברור וצעד מעשי.",
        intro:
          "שורת חמישה קלפים נותנת תשובה מלאה יותר משלושה קלפים. הקלף המרכזי הוא מוקד הקריאה; הקלפים משני צדדיו מראים את הכוחות סביבו, והקלף האחרון מראה לאן הדברים מובילים.",
        note:
          "הצליבו את קלף 1 עם קלף 5 ואת קלף 2 עם קלף 4 לתובנה נוספת על הכוחות סביב המרכז.",
        positions: [
          {
            key: "situation",
            name: "מצב",
            meaning: "מה באמת קורה."
          },
          {
            key: "challenge",
            name: "אתגר",
            meaning: "מה שמסבך או מתנגד."
          },
          {
            key: "focus",
            name: "מוקד",
            meaning: "לב העניין."
          },
          {
            key: "advice",
            name: "עצה",
            meaning: "מה לעשות עכשיו."
          },
          {
            key: "outcome",
            name: "תוצאה",
            meaning: "לאן הדרך הנוכחית מובילה."
          }
        ]
      }
    }
  },
  {
    slug: "love-seven",
    order: 4,
    icon: "heart",
    layout: "love",
    count: 7,
    focusIndex: 2,
    adviceIndex: 5,
    outcomeIndex: 6,
    content: {
      en: {
        name: "Love Seven",
        short: "You, your partner, and the bond between you.",
        lede: "Seven cards for both sides of a relationship, without taking a side.",
        intro:
          "This spread looks at both sides of a relationship without taking a side. The first two cards show each person's position, the middle three show the relationship itself, and the last two show the advice and potential.",
        note:
          "Read the first two cards as a pair, then the three middle cards as the relationship's own story. The potential card is not a promise; it is the direction of the current.",
        positions: [
          {
            key: "you",
            name: "You",
            meaning: "Your feelings, needs, and role."
          },
          {
            key: "partner",
            name: "Your partner",
            meaning: "Their feelings, needs, and role."
          },
          {
            key: "bond",
            name: "The bond now",
            meaning: "The current state of the relationship."
          },
          {
            key: "connects",
            name: "What connects you",
            meaning: "The glue between you."
          },
          {
            key: "attention",
            name: "What needs attention",
            meaning: "The friction or blind spot."
          },
          {
            key: "advice",
            name: "Advice",
            meaning: "What would help most."
          },
          {
            key: "potential",
            name: "Potential",
            meaning: "Where the relationship can go."
          }
        ]
      },
      he: {
        name: "אהבה בשבעה",
        short: "אתם, בן או בת הזוג והקשר ביניכם.",
        lede: "שבעה קלפים לשני הצדדים של מערכת יחסים, בלי לבחור צד.",
        intro:
          "הפריסה הזו מסתכלת על שני הצדדים של מערכת יחסים בלי לבחור צד. שני הקלפים הראשונים מראים את מקומו של כל אחד, שלושת האמצעיים מראים את הקשר עצמו, והשניים האחרונים מראים עצה ופוטנציאל.",
        note:
          "קראו את שני הקלפים הראשונים כזוג, ואז את שלושת האמצעיים כסיפור של הקשר עצמו. קלף הפוטנציאל אינו הבטחה; הוא כיוון הזרם.",
        positions: [
          {
            key: "you",
            name: "אתם",
            meaning: "הרגשות, הצרכים והתפקיד שלכם."
          },
          {
            key: "partner",
            name: "בן או בת הזוג",
            meaning: "הרגשות, הצרכים והתפקיד שלהם."
          },
          {
            key: "bond",
            name: "הקשר עכשיו",
            meaning: "המצב הנוכחי של מערכת היחסים."
          },
          {
            key: "connects",
            name: "מה מחבר",
            meaning: "הדבק ביניכם."
          },
          {
            key: "attention",
            name: "מה דורש תשומת לב",
            meaning: "החיכוך או הנקודה העיוורת."
          },
          {
            key: "advice",
            name: "עצה",
            meaning: "מה יעזור ביותר."
          },
          {
            key: "potential",
            name: "פוטנציאל",
            meaning: "לאן הקשר יכול ללכת."
          }
        ]
      }
    }
  },
  {
    slug: "nine-cards",
    order: 5,
    icon: "garden",
    layout: "grid3",
    count: 9,
    focusIndex: 4,
    adviceIndex: 7,
    outcomeIndex: 8,
    content: {
      en: {
        name: "Nine Cards",
        short: "A 3×3 portrait of past, present, and future.",
        lede: "Nine cards in three rows: roots, the present moment, and what is coming.",
        intro:
          "The nine-card square reads in three rows: the top row is the past, the middle row is the present, and the bottom row is the future. The centre card is the heart of the matter and gives the reading its tone.",
        note:
          "Read the rows first for the timeline, then the columns for the themes that run through the whole situation.",
        positions: [
          {
            key: "roots",
            name: "Roots",
            meaning: "What lies beneath the situation."
          },
          {
            key: "carry",
            name: "What you carry",
            meaning: "Habits, memories, or influences."
          },
          {
            key: "fades",
            name: "What fades",
            meaning: "What is losing power."
          },
          {
            key: "you-now",
            name: "You now",
            meaning: "Your current position."
          },
          {
            key: "heart",
            name: "Heart of the matter",
            meaning: "The central theme."
          },
          {
            key: "surrounds",
            name: "What surrounds you",
            meaning: "People and circumstances."
          },
          {
            key: "approaches",
            name: "What approaches",
            meaning: "The next development."
          },
          {
            key: "action",
            name: "Action to take",
            meaning: "The helpful move."
          },
          {
            key: "outcome",
            name: "Likely outcome",
            meaning: "Where it leads."
          }
        ]
      },
      he: {
        name: "תשעה קלפים",
        short: "דיוקן 3×3 של עבר, הווה ועתיד.",
        lede: "תשעה קלפים בשלוש שורות: שורשים, הרגע הנוכחי ומה שמגיע.",
        intro:
          "ריבוע תשעת הקלפים נקרא בשלוש שורות: השורה העליונה היא העבר, האמצעית ההווה והתחתונה העתיד. הקלף המרכזי הוא לב העניין ונותן לקריאה את הטון שלה.",
        note:
          "קראו קודם את השורות לציר הזמן, ואז את העמודות לנושאים שחוזרים בכל המצב.",
        positions: [
          {
            key: "roots",
            name: "שורשים",
            meaning: "מה שנמצא מתחת למצב."
          },
          {
            key: "carry",
            name: "מה שאתם נושאים",
            meaning: "הרגלים, זיכרונות או השפעות."
          },
          {
            key: "fades",
            name: "מה נמוג",
            meaning: "מה שמאבד כוח."
          },
          {
            key: "you-now",
            name: "אתם עכשיו",
            meaning: "המיקום הנוכחי שלכם."
          },
          {
            key: "heart",
            name: "לב העניין",
            meaning: "הנושא המרכזי."
          },
          {
            key: "surrounds",
            name: "מה מקיף אתכם",
            meaning: "אנשים ונסיבות."
          },
          {
            key: "approaches",
            name: "מה מתקרב",
            meaning: "ההתפתחות הבאה."
          },
          {
            key: "action",
            name: "פעולה שכדאי לנקוט",
            meaning: "הצעד המועיל."
          },
          {
            key: "outcome",
            name: "תוצאה סבירה",
            meaning: "לאן זה מוביל."
          }
        ]
      }
    }
  },
  {
    slug: "thirteen-cards",
    order: 6,
    icon: "moon",
    layout: "cross13",
    count: 13,
    focusIndex: 6,
    adviceIndex: 10,
    outcomeIndex: 8,
    content: {
      en: {
        name: "Thirteen Cards",
        short: "A wide reading with a 4/5/4 layout.",
        lede: "A broad view of a situation: what is above the surface, the timeline, and the hidden potential.",
        intro:
          "The thirteen-card layout gives a broad view of a situation. The top row shows what is above the surface—wishes, fears, blind spots, and help. The middle row runs from past to outcome. The bottom row shows the foundation, advice, what to release, and hidden potential.",
        note:
          "Read the middle row as the spine of the reading. The top row shows what you bring to it; the bottom row shows what supports or lingers beneath it.",
        positions: [
          {
            key: "wish",
            name: "What you wish for",
            meaning: "The desire that colours the question."
          },
          {
            key: "fear",
            name: "What you fear",
            meaning: "The worry that may be shaping your choices."
          },
          {
            key: "unseen",
            name: "What you don't see",
            meaning: "The blind spot or missing information."
          },
          {
            key: "help",
            name: "What helps you",
            meaning: "The resource or ally available."
          },
          {
            key: "past",
            name: "Past",
            meaning: "What led here."
          },
          {
            key: "present",
            name: "Present",
            meaning: "The current state of things."
          },
          {
            key: "heart",
            name: "Heart of the matter",
            meaning: "The central theme."
          },
          {
            key: "future",
            name: "Future",
            meaning: "What is developing."
          },
          {
            key: "outcome",
            name: "Outcome",
            meaning: "The likely result of the current path."
          },
          {
            key: "foundation",
            name: "Foundation",
            meaning: "What holds the situation steady."
          },
          {
            key: "advice",
            name: "Advice",
            meaning: "The most helpful step."
          },
          {
            key: "release",
            name: "What to release",
            meaning: "What you can stop carrying."
          },
          {
            key: "potential",
            name: "Hidden potential",
            meaning: "What can grow if you make room for it."
          }
        ]
      },
      he: {
        name: "שלושה עשר קלפים",
        short: "קריאה רחבה בפריסה 4/5/4.",
        lede: "מבט רחב על מצב: מה שמעל לפני השטח, ציר הזמן והפוטנציאל הנסתר.",
        intro:
          "פריסת שלושה עשר הקלפים נותנת מבט רחב על מצב. השורה העליונה מראה מה שמעל לפני השטח — משאלות, פחדים, נקודות עיוורות ועזרה. השורה האמצעית נעה מהעבר אל התוצאה. השורה התחתונה מראה את היסוד, העצה, מה לשחרר ואת הפוטנציאל הנסתר.",
        note:
          "קראו את השורה האמצעית כעמוד השדרה של הקריאה. השורה העליונה מראה מה אתם מביאים איתכם; התחתונה מראה מה תומך או נשאר מתחת לפני השטח.",
        positions: [
          {
            key: "wish",
            name: "מה שאתם מייחלים לו",
            meaning: "הרצון שצובע את השאלה."
          },
          {
            key: "fear",
            name: "מה שאתם חוששים ממנו",
            meaning: "הדאגה שעשויה לעצב את הבחירות שלכם."
          },
          {
            key: "unseen",
            name: "מה שאינכם רואים",
            meaning: "הנקודה העיוורת או המידע החסר."
          },
          {
            key: "help",
            name: "מה עוזר לכם",
            meaning: "המשאב או בעל הברית הזמין."
          },
          {
            key: "past",
            name: "עבר",
            meaning: "מה שהוביל לכאן."
          },
          {
            key: "present",
            name: "הווה",
            meaning: "המצב הנוכחי של הדברים."
          },
          {
            key: "heart",
            name: "לב העניין",
            meaning: "הנושא המרכזי."
          },
          {
            key: "future",
            name: "עתיד",
            meaning: "מה שמתפתח."
          },
          {
            key: "outcome",
            name: "תוצאה",
            meaning: "התוצאה הסבירה של הדרך הנוכחית."
          },
          {
            key: "foundation",
            name: "יסוד",
            meaning: "מה שמחזיק את המצב יציב."
          },
          {
            key: "advice",
            name: "עצה",
            meaning: "הצעד המועיל ביותר."
          },
          {
            key: "release",
            name: "מה לשחרר",
            meaning: "מה שאפשר להפסיק לשאת."
          },
          {
            key: "potential",
            name: "פוטנציאל נסתר",
            meaning: "מה שיכול לצמוח אם תפנו לו מקום."
          }
        ]
      }
    }
  },
  {
    slug: "grand-tableau",
    order: 7,
    icon: "star",
    layout: "grand",
    count: 36,
    focusIndex: 13,
    adviceIndex: null,
    outcomeIndex: null,
    houses: true,
    content: {
      en: {
        name: "Grand Tableau",
        short: "All 36 cards, read as a map of your life.",
        lede: "The complete deck in a 9×4 grid: the most detailed Lenormand reading.",
        intro:
          "The Grand Tableau uses every card in the deck. Each of the 36 houses has its own meaning, and the cards that fall there colour that area of life. It is the most detailed Lenormand spread and is best read slowly.",
        note:
          "The summary highlights the corners, the centre, the fate line, and the significator. Every card in the grid links to its full interpretation.",
        positions: []
      },
      he: {
        name: "הטבלה הגדולה",
        short: "כל 36 הקלפים, כקריאה של מפת החיים.",
        lede: "החפיסה המלאה ברשת 9×4: הקריאה המפורטת ביותר בלנורמנד.",
        intro:
          "הטבלה הגדולה משתמשת בכל הקלפים בחפיסה. לכל אחד מ-36 הבתים יש משמעות משלו, והקלפים שנופלים שם צובעים את אותו תחום חיים. זוהי פריסת לנורמנד המפורטת ביותר, וכדאי לקרוא אותה לאט.",
        note:
          "הסיכום מדגיש את הפינות, המרכז, קו הגורל והקלף המייצג. כל קלף ברשת מקושר לפרשנות המלאה שלו.",
        positions: []
      }
    }
  }
];

export const spreadBySlug = Object.fromEntries(spreads.map((spread) => [spread.slug, spread]));
