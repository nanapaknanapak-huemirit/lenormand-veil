export const cards = [
  {
    number: 1,
    slug: "rider",
    icon: "rider",
    playingCard: { rank: "9", suit: "hearts" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Rider",
        keywords: ["news", "movement", "arrival"],
        core:
          "A message, visitor, or fresh development is on its way. The Rider brings movement and a timely update that invites you to respond.",
        love:
          "A new contact or an important message from a partner stirs things up; singles may meet someone lively.",
        work: "Expect news about a project, an interview, or a delivery; quick action is favoured.",
        health: "Energy returns and small improvements arrive; keep moving.",
        advice: "Act on the news you receive and keep your response swift.",
        timing: "Soon; days."
      },
      he: {
        name: "רוכב",
        keywords: ["חדשות", "תנועה", "הגעה"],
        core:
          "הודעה, מבקר או התפתחות חדשה בדרך. הרוכב מביא תנועה ועדכון בזמן שמזמין אתכם להגיב.",
        love:
          "קשר חדש או הודעה חשובה מבן או בת הזוג מעוררים עניין; לרווקים צפויה פגישה עם מישהו תוסס.",
        work: "צפו לבשורות על פרויקט, ראיון או משלוח; פעולה מהירה מומלצת.",
        health: "האנרגיה שבה והשיפור מגיע בהדרגה; המשיכו לנוע.",
        advice: "פעלו לפי המידע שקיבלתם והגיבו במהירות.",
        timing: "בקרוב; ימים."
      }
    }
  },
  {
    number: 2,
    slug: "clover",
    icon: "clover",
    playingCard: { rank: "6", suit: "diamonds" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Clover",
        keywords: ["luck", "opportunity", "relief"],
        core:
          "A small stroke of luck or a brief opening appears. The Clover favours light risks, pleasant surprises, and a reason to smile.",
        love: "A playful encounter or a moment of ease brightens a relationship.",
        work: "A short-term opportunity or lucky break can be seized now.",
        health: "A minor ailment lifts; good spirits support recovery.",
        advice: "Say yes to the small chance in front of you, but do not overplay your luck.",
        timing: "Within days; short-lived."
      },
      he: {
        name: "תלתן",
        keywords: ["מזל", "הזדמנות", "הקלה"],
        core:
          "הצלחה קטנה או פתח קצר מופיעים. התלתן מעדיף סיכונים קטנים, הפתעות נעימות וסיבה לחייך.",
        love: "מפגש שובבי או רגע של קלילות מאירים מערכת יחסים.",
        work: "הזדמנות לטווח קצר או פריצת מזל אפשר לנצל עכשיו.",
        health: "מחלה קלה חולפת; רוח טובה תומכת בהחלמה.",
        advice: "אמרו כן להזדמנות הקטנה שמולכם, אך אל תמתחו את המזל יותר מדי.",
        timing: "בתוך ימים; לזמן קצר."
      }
    }
  },
  {
    number: 3,
    slug: "ship",
    icon: "ship",
    playingCard: { rank: "10", suit: "spades" },
    polarity: "neutral",
    yesNo: "yes",
    content: {
      en: {
        name: "Ship",
        keywords: ["travel", "distance", "expansion"],
        core:
          "Journeys, foreign matters, and a widening horizon are indicated. The Ship speaks of movement toward something larger, often with some distance involved.",
        love: "Long-distance love, a trip together, or a relationship that crosses borders.",
        work: "Business abroad, trade, relocation, or a venture that expands your reach.",
        health: "Travel or a change of scene supports wellbeing; watch for motion sickness.",
        advice: "Set a course and allow the journey to unfold rather than forcing the destination.",
        timing: "Weeks to months."
      },
      he: {
        name: "ספינה",
        keywords: ["מסע", "מרחק", "התרחבות"],
        core:
          "מסעות, עניינים זרים ואופק מתרחב מסומנים. הספינה מדברת על תנועה לעבר משהו גדול יותר, לרוב עם מרחק.",
        love: "אהבה מרחוק, טיול משותף או קשר שחוצה גבולות.",
        work: "עסקים בחו״ל, סחר, מעבר דירה או מיזם שמרחיב את טווח הפעולה.",
        health: "נסיעה או שינוי סביבה תומכים בבריאות; היזהרו ממחלת נסיעה.",
        advice: "קבעו מסלול ותנו למסע להתפתח במקום לכפות את היעד.",
        timing: "שבועות עד חודשים."
      }
    }
  },
  {
    number: 4,
    slug: "house",
    icon: "house",
    playingCard: { rank: "K", suit: "hearts" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "House",
        keywords: ["home", "security", "family"],
        core:
          "Home, family, and a stable foundation take centre stage. The House points to comfort, property, and the people who make you feel safe.",
        love:
          "A committed, domestic connection; living together or family matters gain importance.",
        work: "A stable job, family business, or work from home is favoured.",
        health: "Rest at home and attend to family health; the body asks for security.",
        advice: "Invest in the foundation you come home to.",
        timing: "Long-term; settled."
      },
      he: {
        name: "בית",
        keywords: ["בית", "ביטחון", "משפחה"],
        core:
          "בית, משפחה ויסוד יציב במרכז. הבית מצביע על נוחות, נכסים והאנשים שנותנים לכם תחושת ביטחון.",
        love: "קשר מחויב ומשפחתי; מגורים משותפים או ענייני משפחה מקבלים משמעות.",
        work: "עבודה יציבה, עסק משפחתי או עבודה מהבית מועדפים.",
        health: "מנוחה בבית וטיפול בבריאות המשפחה; הגוף מבקש ביטחון.",
        advice: "השקיעו ביסוד שאליו אתם חוזרים הביתה.",
        timing: "לטווח ארוך; יציב."
      }
    }
  },
  {
    number: 5,
    slug: "tree",
    icon: "tree",
    playingCard: { rank: "7", suit: "hearts" },
    polarity: "neutral",
    yesNo: "maybe",
    content: {
      en: {
        name: "Tree",
        keywords: ["growth", "health", "roots"],
        core:
          "Slow, organic growth and deep roots are emphasised. The Tree asks for patience and attention to long-term health and ancestry.",
        love: "A relationship grows steadily; old family patterns may need gentle tending.",
        work: "Steady progress and long-term development matter more than quick wins.",
        health: "The card of vitality and slow recovery; pay attention to chronic issues.",
        advice: "Nourish what you want to grow and give it time.",
        timing: "Months to years."
      },
      he: {
        name: "עץ",
        keywords: ["צמיחה", "בריאות", "שורשים"],
        core:
          "צמיחה איטית ואורגנית ושורשים עמוקים מודגשים. העץ מבקש סבלנות ותשומת לב לבריאות ארוכת טווח ולשורשים המשפחתיים.",
        love: "מערכת יחסים מתפתחת בהדרגה; דפוסים משפחתיים ישנים עשויים לדרוש טיפול עדין.",
        work: "התקדמות יציבה והתפתחות ארוכת טווח חשובות יותר מהישגים מהירים.",
        health: "קלף החיות וההחלמה האיטית; שימו לב לבעיות כרוניות.",
        advice: "הזינו את מה שאתם רוצים שיצמח ותנו לו זמן.",
        timing: "חודשים עד שנים."
      }
    }
  },
  {
    number: 6,
    slug: "clouds",
    icon: "clouds",
    playingCard: { rank: "K", suit: "clubs" },
    polarity: "challenging",
    yesNo: "maybe",
    content: {
      en: {
        name: "Clouds",
        keywords: ["confusion", "uncertainty", "weather"],
        core:
          "Confusion, doubt, or a passing storm clouds the view. The Clouds ask you to wait for clarity rather than decide in the fog.",
        love: "Mixed signals or unspoken worries blur the relationship; do not overinterpret.",
        work: "Plans are unclear and information is incomplete; verify before committing.",
        health: "Stress, low mood, or a vague complaint needs patient investigation.",
        advice: "Pause major decisions until the air clears.",
        timing: "Passing; a few days or weeks."
      },
      he: {
        name: "עננים",
        keywords: ["בלבול", "אי־ודאות", "ערפל"],
        core:
          "בלבול, ספק או סערה חולפת מעיבים על הראייה. העננים מבקשים להמתין לבהירות ולא להחליט בערפל.",
        love: "אותות מעורבים או דאגות לא מדוברות מטשטשים את הקשר; אל תפרשו יותר מדי.",
        work: "התוכניות לא ברורות והמידע חסר; בדקו לפני התחייבות.",
        health: "לחץ, מצב רוח ירוד או תלונה מעורפלת דורשים בירור סבלני.",
        advice: "עצרו החלטות גדולות עד שהאוויר יתבהר.",
        timing: "חולף; ימים או שבועות."
      }
    }
  },
  {
    number: 7,
    slug: "snake",
    icon: "snake",
    playingCard: { rank: "Q", suit: "clubs" },
    polarity: "challenging",
    yesNo: "no",
    content: {
      en: {
        name: "Snake",
        keywords: ["deception", "temptation", "winding path"],
        core:
          "Something is not straightforward: a hidden motive, a rival, or a tempting detour. The Snake warns you to look beneath the surface.",
        love: "Jealousy, seduction, or a third party complicates matters; honesty is essential.",
        work: "Watch for office politics, false promises, or a complicated negotiation.",
        health: "Pay attention to digestion and stress; avoid quick fixes.",
        advice: "Move deliberately and trust your instincts about what is being withheld.",
        timing: "Now; ongoing until addressed."
      },
      he: {
        name: "נחש",
        keywords: ["הטעיה", "פיתוי", "דרך מפותלת"],
        core:
          "משהו אינו ישר: מניע נסתר, יריב או עיקוף מפתה. הנחש מזהיר להסתכל מתחת לפני השטח.",
        love: "קנאה, פיתוי או צד שלישי מסבכים את העניינים; כנות חיונית.",
        work: "היזהרו מפוליטיקה במקום העבודה, מהבטחות שווא או ממשא ומתן מסובך.",
        health: "שימו לב לעיכול ולחץ; הימנעו מפתרונות מהירים.",
        advice: "נועו בזהירות וסמכו על האינטואיציה לגבי מה שמסתירים מכם.",
        timing: "עכשיו; נמשך עד שיטופל."
      }
    }
  },
  {
    number: 8,
    slug: "coffin",
    icon: "coffin",
    playingCard: { rank: "9", suit: "diamonds" },
    polarity: "challenging",
    yesNo: "no",
    content: {
      en: {
        name: "Coffin",
        keywords: ["ending", "rest", "transformation"],
        core:
          "A chapter closes, making room for something else. The Coffin is not literal death but a pause, a loss, or a necessary ending.",
        love: "A relationship reaches a turning point; grief or distance may need to be honoured.",
        work: "A job or project ends; allow yourself time before rushing into the next thing.",
        health: "Fatigue or recovery demands rest; do not push through exhaustion.",
        advice: "Let what is finished be finished, and rest before you rebuild.",
        timing: "At a standstill; then renewal."
      },
      he: {
        name: "ארון קבורה",
        keywords: ["סיום", "מנוחה", "שינוי"],
        core:
          "פרק נסגר ומפנה מקום למשהו אחר. ארון הקבורה אינו מוות ממשי אלא עצירה, אובדן או סיום הכרחי.",
        love: "מערכת יחסים מגיעה לנקודת מפנה; ייתכן שצריך לכבד אבל או מרחק.",
        work: "עבודה או פרויקט מסתיימים; תנו לעצמכם זמן לפני המעבר הבא.",
        health: "עייפות או החלמה דורשות מנוחה; אל תדחפו דרך תשישות.",
        advice: "תנו למה שהסתיים להסתיים, ונוחו לפני שאתם בונים מחדש.",
        timing: "בקיפאון; ואז התחדשות."
      }
    }
  },
  {
    number: 9,
    slug: "bouquet",
    icon: "bouquet",
    playingCard: { rank: "Q", suit: "spades" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Bouquet",
        keywords: ["gift", "beauty", "appreciation"],
        core:
          "A gift, compliment, or moment of beauty arrives. The Bouquet speaks of appreciation, charm, and pleasant invitations.",
        love: "Romance, affection, and thoughtful gestures flourish.",
        work: "Recognition, a pleasant collaboration, or a creative offer.",
        health: "Pampering and beauty care restore balance; mood lifts.",
        advice: "Receive the good things offered to you and express gratitude.",
        timing: "Soon; a pleasant interlude."
      },
      he: {
        name: "זר פרחים",
        keywords: ["מתנה", "יופי", "הערכה"],
        core:
          "מתנה, מחמאה או רגע של יופי מגיעים. זר הפרחים מדבר על הערכה, קסם והזמנות נעימות.",
        love: "רומנטיקה, חיבה ומחוות מתחשבות פורחות.",
        work: "הכרה, שיתוף פעולה נעים או הצעה יצירתית.",
        health: "פינוק וטיפוח יופי מחזירים איזון; מצב הרוח מתרומם.",
        advice: "קבלו את הדברים הטובים שמציעים לכם והביעו תודה.",
        timing: "בקרוב; הפוגה נעימה."
      }
    }
  },
  {
    number: 10,
    slug: "scythe",
    icon: "scythe",
    playingCard: { rank: "J", suit: "diamonds" },
    polarity: "challenging",
    yesNo: "no",
    content: {
      en: {
        name: "Scythe",
        keywords: ["cut", "decision", "harvest"],
        core:
          "A sharp decision or sudden cut changes the situation. The Scythe warns of consequences and the need to act cleanly.",
        love: "A breakup, ultimatum, or decisive conversation may be necessary.",
        work: "A contract ends, a role is cut, or a fast decision must be made.",
        health: "Risk of accidents or sudden pain; be careful and seek help if needed.",
        advice: "Make the cut you have been avoiding, and accept that it cannot be undone.",
        timing: "Sudden; now."
      },
      he: {
        name: "חרמש",
        keywords: ["חיתוך", "החלטה", "קציר"],
        core:
          "החלטה חדה או חיתוך פתאומי משנים את המצב. החרמש מזהיר מפני השלכות ומורה לפעול בצורה נקייה.",
        love: "פרידה, אולטימטום או שיחה מכרעת עשויים להיות נחוצים.",
        work: "חוזה מסתיים, תפקיד נחתך או החלטה מהירה נדרשת.",
        health: "סיכון לתאונות או כאב פתאומי; היזהרו ופנו לעזרה במידת הצורך.",
        advice: "בצעו את החיתוך שנמנעתם ממנו, וקבלו שלא ניתן לבטל אותו.",
        timing: "פתאומי; עכשיו."
      }
    }
  },
  {
    number: 11,
    slug: "whip",
    icon: "whip",
    playingCard: { rank: "J", suit: "clubs" },
    polarity: "challenging",
    yesNo: "no",
    content: {
      en: {
        name: "Whip",
        keywords: ["conflict", "repetition", "passion"],
        core:
          "Conflict, repetitive strain, or intense passion is at play. The Whip points to arguments that repeat until the underlying issue is named.",
        love: "Passion runs high, but so can quarrels; make room for honest friction.",
        work: "Disputes, pressure, or repetitive tasks demand boundaries.",
        health: "Repetitive strain, tension, or inflammation; rest the affected area.",
        advice: "Break the loop by addressing the root of the conflict.",
        timing: "Repeating; until resolved."
      },
      he: {
        name: "שוט",
        keywords: ["קונפליקט", "חזרתיות", "תשוקה"],
        core:
          "קונפליקט, מאמץ חוזר או תשוקה עזה נמצאים במשחק. השוט מצביע על ויכוחים שחוזרים עד שהעניין הבסיסי נקרא בשמו.",
        love: "התשוקה גבוהה, אך גם המריבות; עשו מקום לחיכוך כן.",
        work: "מחלוקות, לחץ או משימות חוזרות דורשים גבולות.",
        health: "מאמץ חוזר, מתח או דלקת; הניחו לאזור הפגוע.",
        advice: "שברו את הלופ על ידי טיפול בשורש הקונפליקט.",
        timing: "חוזר; עד שיפתר."
      }
    }
  },
  {
    number: 12,
    slug: "birds",
    icon: "birds",
    playingCard: { rank: "7", suit: "diamonds" },
    polarity: "neutral",
    yesNo: "maybe",
    content: {
      en: {
        name: "Birds",
        keywords: ["conversation", "news", "nervous energy"],
        core:
          "Conversations, gossip, and quick exchanges fill the air. The Birds brings news through words and a flutter of nervous energy.",
        love: "Talking things through helps; too much chatter can also create anxiety.",
        work: "Meetings, calls, and negotiations are active; clarify who said what.",
        health: "Nervous tension or sleep disruption; slow your breathing.",
        advice: "Speak clearly, listen closely, and do not spread what you have not verified.",
        timing: "Very soon; hours to days."
      },
      he: {
        name: "ציפורים",
        keywords: ["שיחה", "חדשות", "אנרגיה עצבנית"],
        core:
          "שיחות, רכילות והחלפות מהירות ממלאות את האוויר. הציפורים מביאות חדשות דרך מילים ורפרוף של אנרגיה עצבנית.",
        love: "דיבור כן עוזר; יותר מדי פטפוט עלול גם ליצור חרדה.",
        work: "פגישות, שיחות ומשא ומתן פעילים; הבהירו מי אמר מה.",
        health: "מתח עצבני או שיבוש שינה; האטו את הנשימה.",
        advice: "דברו ברור, הקשיבו היטב ואל תפיצו מה שלא אימתם.",
        timing: "מהר מאוד; שעות עד ימים."
      }
    }
  },
  {
    number: 13,
    slug: "child",
    icon: "child",
    playingCard: { rank: "J", suit: "spades" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Child",
        keywords: ["new beginning", "innocence", "play"],
        core:
          "A fresh start, a childlike approach, or something small taking its first breath. The Child invites curiosity and lightness.",
        love: "A new romance, playfulness, or family news concerning a child.",
        work: "A new role, training, or small project with room to grow.",
        health: "Small improvements and renewed energy; approach recovery with patience.",
        advice: "Begin small and allow yourself to be a beginner.",
        timing: "Soon; early stage."
      },
      he: {
        name: "ילד",
        keywords: ["התחלה חדשה", "תמימות", "משחק"],
        core:
          "התחלה חדשה, גישה ילדותית או משהו קטן שנושם לראשונה. הילד מזמין סקרנות וקלילות.",
        love: "רומן חדש, שובבות או חדשות משפחתיות הנוגעות לילד.",
        work: "תפקיד חדש, הכשרה או פרויקט קטן עם מקום לצמוח.",
        health: "שיפורים קטנים ואנרגיה מחודשת; גשו להחלמה בסבלנות.",
        advice: "התחילו בקטן ותנו לעצמכם להיות מתחילים.",
        timing: "בקרוב; שלב ראשוני."
      }
    }
  },
  {
    number: 14,
    slug: "fox",
    icon: "fox",
    playingCard: { rank: "9", suit: "clubs" },
    polarity: "challenging",
    yesNo: "no",
    content: {
      en: {
        name: "Fox",
        keywords: ["cunning", "caution", "work"],
        core:
          "Cleverness can serve you, but so can deception. The Fox asks you to question motives, including your own, and to work smart rather than hard.",
        love: "Someone may be holding back or playing a game; honesty will reveal it.",
        work: "A job or strategy requires skill and caution; check the fine print.",
        health: "Stress from overwork or a hidden issue; get a second opinion.",
        advice: "Stay alert, verify the details, and do not mistake charm for trust.",
        timing: "Now; requires vigilance."
      },
      he: {
        name: "שועל",
        keywords: ["ערמומיות", "זהירות", "עבודה"],
        core:
          "ערמומיות יכולה לשרת אתכם, אך גם הונאה. השועל מבקש לפקפק במניעים, כולל שלכם, ולעבוד חכם ולא קשה.",
        love: "מישהו עשוי להסתיר או לשחק משחק; כנות תחשוף זאת.",
        work: "עבודה או אסטרטגיה דורשות מיומנות וזהירות; בדקו את האותיות הקטנות.",
        health: "לחץ מעבודת יתר או בעיה נסתרת; בקשו חוות דעת שנייה.",
        advice: "הישארו ערניים, אמתו פרטים ואל תבלבלו קסם עם אמון.",
        timing: "עכשיו; דורש ערנות."
      }
    }
  },
  {
    number: 15,
    slug: "bear",
    icon: "bear",
    playingCard: { rank: "10", suit: "clubs" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Bear",
        keywords: ["strength", "protection", "resources"],
        core:
          "Strength, protection, and material resources are available. The Bear represents a powerful ally, a boss, or your own resilience.",
        love: "A protective partner or a relationship that feels secure and grounded.",
        work: "Support from a superior, financial strength, or a leadership role.",
        health: "Robust vitality, but watch for overindulgence and weight.",
        advice: "Use your strength to protect what matters, not to overpower others.",
        timing: "Long-term; stable."
      },
      he: {
        name: "דוב",
        keywords: ["כוח", "הגנה", "משאבים"],
        core:
          "כוח, הגנה ומשאבים חומריים זמינים. הדוב מייצג בעל ברית חזק, מעסיק או החוסן שלכם.",
        love: "בן זוג מגן או מערכת יחסים שמרגישה בטוחה ומבוססת.",
        work: "תמיכה ממנהל, חוזק פיננסי או תפקיד מנהיגות.",
        health: "חיוניות איתנה, אך היזהרו מהגזמה ומעלייה במשקל.",
        advice: "השתמשו בכוחכם כדי להגן על מה שחשוב, לא כדי להשתלט על אחרים.",
        timing: "לטווח ארוך; יציב."
      }
    }
  },
  {
    number: 16,
    slug: "star",
    icon: "star",
    playingCard: { rank: "6", suit: "hearts" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Star",
        keywords: ["hope", "guidance", "inspiration"],
        core:
          "Hope, inspiration, and a clear sense of direction light the way. The Star encourages you to trust your vision and follow the signal.",
        love: "A relationship with shared dreams; a wish about love may come true.",
        work: "Recognition, creative inspiration, or a goal worth pursuing.",
        health: "Healing energy and optimism; visualisation supports recovery.",
        advice: "Keep your eyes on the star you want to follow.",
        timing: "At night; over time."
      },
      he: {
        name: "כוכב",
        keywords: ["תקווה", "הכוונה", "השראה"],
        core:
          "תקווה, השראה ותחושת כיוון ברורה מאירות את הדרך. הכוכב מעודד לסמוך על החזון ולעקוב אחר האות.",
        love: "מערכת יחסים עם חלומות משותפים; משאלת לב בנוגע לאהבה עשויה להתגשם.",
        work: "הכרה, השראה יצירתית או מטרה ששווה לרדוף אחריה.",
        health: "אנרגיית ריפוי ואופטימיות; דמיון מודרך תומך בהחלמה.",
        advice: "המשיכו להביט בכוכב שברצונכם ללכת אחריו.",
        timing: "בלילה; לאורך זמן."
      }
    }
  },
  {
    number: 17,
    slug: "stork",
    icon: "stork",
    playingCard: { rank: "Q", suit: "hearts" },
    polarity: "positive",
    yesNo: "maybe",
    content: {
      en: {
        name: "Stork",
        keywords: ["change", "movement", "birth"],
        core:
          "A meaningful change is underway, often involving home, family, or a new phase. The Stork brings movement and renewal.",
        love: "A relationship moves forward, possibly toward living together or family news.",
        work: "A transfer, promotion, or new direction brings fresh energy.",
        health: "Recovery and renewal; pregnancy or family planning may be relevant.",
        advice: "Welcome the change and prepare the nest for what is arriving.",
        timing: "Weeks to months."
      },
      he: {
        name: "חסידה",
        keywords: ["שינוי", "תנועה", "לידה"],
        core:
          "שינוי משמעותי בעיצומו, לרוב בבית, במשפחה או בשלב חדש. החסידה מביאה תנועה והתחדשות.",
        love: "מערכת יחסים מתקדמת, אולי לקראת מגורים משותפים או חדשות משפחתיות.",
        work: "העברה, קידום או כיוון חדש מביאים אנרגיה רעננה.",
        health: "החלמה והתחדשות; היריון או תכנון משפחה עשויים להיות רלוונטיים.",
        advice: "קבלו את השינוי והכינו את הקן למה שמגיע.",
        timing: "שבועות עד חודשים."
      }
    }
  },
  {
    number: 18,
    slug: "dog",
    icon: "dog",
    playingCard: { rank: "10", suit: "hearts" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Dog",
        keywords: ["loyalty", "friendship", "support"],
        core:
          "Loyalty, friendship, and reliable support surround you. The Dog points to someone who stays, and to the value of trust.",
        love: "A devoted partner or a friendship that deepens into love.",
        work: "A trustworthy colleague or long-term ally; teamwork is favoured.",
        health: "Support from others aids recovery; keep good habits consistent.",
        advice: "Lean on the people who have proven themselves, and be that person in return.",
        timing: "Long-term; enduring."
      },
      he: {
        name: "כלב",
        keywords: ["נאמנות", "חברות", "תמיכה"],
        core:
          "נאמנות, חברות ותמיכה אמינה מקיפות אתכם. הכלב מצביע על מישהו שנשאר, ועל ערכו של האמון.",
        love: "בן זוג מסור או חברות שמעמיקה לאהבה.",
        work: "עמית מהימן או בעל ברית לטווח ארוך; עבודת צוות מועדפת.",
        health: "תמיכה מאחרים מסייעת בהחלמה; שמרו על הרגלים טובים בעקביות.",
        advice: "הישענו על האנשים שהוכיחו את עצמם, והיו האדם הזה בחזרה.",
        timing: "לטווח ארוך; מתמשך."
      }
    }
  },
  {
    number: 19,
    slug: "tower",
    icon: "tower",
    playingCard: { rank: "6", suit: "spades" },
    polarity: "neutral",
    yesNo: "maybe",
    content: {
      en: {
        name: "Tower",
        keywords: ["institution", "ambition", "solitude"],
        core:
          "The Tower speaks of institutions, authority, and the need for perspective. It can mean ambition and structure, or isolation and distance.",
        love: "Emotional distance, a formal commitment, or a relationship with an age gap.",
        work: "A large organisation, government, or a role with authority.",
        health: "A hospital, clinic, or need for structured rest.",
        advice: "Step back and look from a higher vantage point.",
        timing: "Long-term; bureaucratic delays."
      },
      he: {
        name: "מגדל",
        keywords: ["מוסד", "שאפתנות", "בדידות"],
        core:
          "המגדל מדבר על מוסדות, סמכות וצורך בפרספקטיבה. הוא יכול לייצג שאפתנות ומבנה, או בידוד ומרחק.",
        love: "מרחק רגשי, מחויבות רשמית או קשר עם פער גילים.",
        work: "ארגון גדול, ממשלה או תפקיד עם סמכות.",
        health: "בית חולים, מרפאה או צורך במנוחה מובנית.",
        advice: "צעדו אחורה והביטו מנקודת תצפית גבוהה יותר.",
        timing: "לטווח ארוך; עיכובים ביורוקרטיים."
      }
    }
  },
  {
    number: 20,
    slug: "garden",
    icon: "garden",
    playingCard: { rank: "8", suit: "spades" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Garden",
        keywords: ["community", "social life", "gathering"],
        core:
          "Community, social gatherings, and public life flourish. The Garden invites you to be seen and to cultivate connections.",
        love: "Meeting someone through friends or social events; a relationship that enjoys company.",
        work: "Networking, teamwork, and public-facing work are favoured.",
        health: "Outdoor time and social contact support wellbeing.",
        advice: "Put yourself where people gather and let yourself be known.",
        timing: "Soon; social season."
      },
      he: {
        name: "גן",
        keywords: ["קהילה", "חיי חברה", "התכנסות"],
        core:
          "קהילה, התכנסויות חברתיות וחיי ציבור פורחים. הגן מזמין אתכם להיראות ולטפח קשרים.",
        love: "פגישה דרך חברים או אירועים חברתיים; מערכת יחסים שנהנית מחברה.",
        work: "נטוורקינג, עבודת צוות ועבודה מול קהל מועדפים.",
        health: "זמן בחוץ ומגע חברתי תומכים ברווחה.",
        advice: "הגיעו למקומות שבהם אנשים מתכנסים ותנו לעצמכם להיות מוכרים.",
        timing: "בקרוב; עונת אירועים."
      }
    }
  },
  {
    number: 21,
    slug: "mountain",
    icon: "mountain",
    playingCard: { rank: "8", suit: "clubs" },
    polarity: "challenging",
    yesNo: "no",
    content: {
      en: {
        name: "Mountain",
        keywords: ["obstacle", "delay", "persistence"],
        core:
          "A significant obstacle or delay stands in the way. The Mountain does not say no forever, but it demands patience and a different route.",
        love: "A barrier between two people—distance, pride, or circumstance—needs time.",
        work: "Blocked progress or a difficult test; prepare thoroughly.",
        health: "Slow recovery or a stubborn condition; consistency matters.",
        advice: "Stop pushing against the rock and find the path around it.",
        timing: "Prolonged; slow."
      },
      he: {
        name: "הר",
        keywords: ["מכשול", "עיכוב", "התמדה"],
        core:
          "מכשול משמעותי או עיכוב עומדים בדרך. ההר לא אומר לא לנצח, אך דורש סבלנות ודרך אחרת.",
        love: "מחסום בין שני אנשים — מרחק, גאווה או נסיבות — דורש זמן.",
        work: "התקדמות חסומה או מבחן קשה; התכוננו היטב.",
        health: "החלמה איטית או מצב עקשן; עקביות חשובה.",
        advice: "הפסיקו לדחוף את הסלע ומצאו את השביל מסביב.",
        timing: "ממושך; איטי."
      }
    }
  },
  {
    number: 22,
    slug: "crossroads",
    icon: "crossroads",
    playingCard: { rank: "Q", suit: "diamonds" },
    polarity: "neutral",
    yesNo: "maybe",
    content: {
      en: {
        name: "Crossroads",
        keywords: ["choice", "options", "decision"],
        core:
          "A decision point and multiple paths are before you. The Crossroads asks you to choose consciously rather than drift.",
        love: "A choice between two directions in love; clarity about what you want is essential.",
        work: "A career decision or a fork in a project; gather information before choosing.",
        health: "Choose a treatment path and commit to it.",
        advice: "Name your options, then choose the one you can stand behind.",
        timing: "Now; decision pending."
      },
      he: {
        name: "צומת דרכים",
        keywords: ["בחירה", "אפשרויות", "החלטה"],
        core:
          "נקודת החלטה ומספר דרכים לפניכם. צומת הדרכים מבקש לבחור במודע ולא להיסחף.",
        love: "בחירה בין שני כיוונים באהבה; בהירות לגבי מה שאתם רוצים חיונית.",
        work: "החלטה בקריירה או פיצול בפרויקט; אספו מידע לפני שתבחרו.",
        health: "בחרו מסלול טיפול והתחייבו אליו.",
        advice: "תנו שם לאפשרויות, ואז בחרו בזו שתוכלו לעמוד מאחוריה.",
        timing: "עכשיו; החלטה ממתינה."
      }
    }
  },
  {
    number: 23,
    slug: "mice",
    icon: "mice",
    playingCard: { rank: "7", suit: "clubs" },
    polarity: "challenging",
    yesNo: "no",
    content: {
      en: {
        name: "Mice",
        keywords: ["loss", "worry", "small damage"],
        core:
          "Small losses, worries, or gradual wear are nibbling at your resources. The Mice asks you to notice what is quietly draining you.",
        love: "Petty grievances or insecurity erode affection; address them before they grow.",
        work: "Details are slipping, or stress is wearing you down; check the numbers.",
        health: "Fatigue, anxiety, or a minor issue that needs attention.",
        advice: "Find the leak and stop it before it becomes a flood.",
        timing: "Gradual; ongoing."
      },
      he: {
        name: "עכברים",
        keywords: ["אובדן", "דאגה", "נזק קטן"],
        core:
          "הפסדים קטנים, דאגות או שחיקה הדרגתית מכרסמים במשאבים. העכברים מבקשים לשים לב למה שמנקז אתכם בשקט.",
        love: "טרוניות קטנות או חוסר ביטחון שוחקים את החיבה; טפלו בהן לפני שיגדלו.",
        work: "פרטים מחליקים, או שמתח שוחק אתכם; בדקו את המספרים.",
        health: "עייפות, חרדה או בעיה קטנה שדורשת תשומת לב.",
        advice: "מצאו את הנזילה ועצרו אותה לפני שהיא תהפוך לשיטפון.",
        timing: "הדרגתי; נמשך."
      }
    }
  },
  {
    number: 24,
    slug: "heart",
    icon: "heart",
    playingCard: { rank: "J", suit: "hearts" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Heart",
        keywords: ["love", "courage", "connection"],
        core:
          "Love, affection, and heartfelt courage are central. The Heart speaks of genuine connection and the bravery to feel.",
        love: "Romance, emotional openness, and mutual affection are strongly favoured.",
        work: "Work you love, or a project driven by passion.",
        health: "Cardiovascular health and emotional wellbeing; lead with care.",
        advice: "Say what is in your heart before the moment passes.",
        timing: "Soon; warm."
      },
      he: {
        name: "לב",
        keywords: ["אהבה", "אומץ", "חיבור"],
        core:
          "אהבה, חיבה ואומץ לבבי במרכז. הלב מדבר על חיבור אמיתי ועל האומץ להרגיש.",
        love: "רומנטיקה, פתיחות רגשית וחיבה הדדית מועדפות מאוד.",
        work: "עבודה שאתם אוהבים, או פרויקט שמונע מתשוקה.",
        health: "בריאות הלב ורווחה רגשית; הובילו בחמלה.",
        advice: "אמרו את מה שבלבכם לפני שהרגע יחלוף.",
        timing: "בקרוב; חם."
      }
    }
  },
  {
    number: 25,
    slug: "ring",
    icon: "ring",
    playingCard: { rank: "A", suit: "clubs" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Ring",
        keywords: ["commitment", "contract", "union"],
        core:
          "A commitment, agreement, or lasting bond is emphasised. The Ring points to promises, contracts, and cycles that bind.",
        love: "Engagement, marriage, or a serious commitment; also a recurring relationship pattern.",
        work: "A contract, partnership, or long-term agreement.",
        health: "Consistency in treatment; a repeating cycle to understand.",
        advice: "Before you commit, be clear about what you are agreeing to.",
        timing: "Long-term; binding."
      },
      he: {
        name: "טבעת",
        keywords: ["מחויבות", "חוזה", "איחוד"],
        core:
          "מחויבות, הסכם או קשר מתמשך מודגשים. הטבעת מצביעה על הבטחות, חוזים ומחזורים שקושרים.",
        love: "אירוסין, נישואין או מחויבות רצינית; גם דפוס יחסים חוזר.",
        work: "חוזה, שותפות או הסכם ארוך טווח.",
        health: "עקביות בטיפול; מחזור חוזר שצריך להבין.",
        advice: "לפני שאתם מתחייבים, הבהירו למה אתם מסכימים.",
        timing: "לטווח ארוך; מחייב."
      }
    }
  },
  {
    number: 26,
    slug: "book",
    icon: "book",
    playingCard: { rank: "10", suit: "diamonds" },
    polarity: "neutral",
    yesNo: "maybe",
    content: {
      en: {
        name: "Book",
        keywords: ["secret", "knowledge", "study"],
        core:
          "Something is hidden or not yet known. The Book points to secrets, study, and information that must be opened before the picture is complete.",
        love: "A private matter or an unspoken feeling; do not assume you know the whole story.",
        work: "Research, training, or confidential information.",
        health: "An unknown factor or test results; seek knowledge.",
        advice: "Open the book—ask the question you have been avoiding.",
        timing: "Until the secret surfaces."
      },
      he: {
        name: "ספר",
        keywords: ["סוד", "ידע", "לימוד"],
        core:
          "משהו נסתר או עדיין לא ידוע. הספר מצביע על סודות, לימוד ומידע שצריך לפתוח לפני שהתמונה שלמה.",
        love: "עניין פרטי או רגש לא מדובר; אל תניחו שאתם יודעים את כל הסיפור.",
        work: "מחקר, הכשרה או מידע חסוי.",
        health: "גורם לא ידוע או תוצאות בדיקות; חפשו ידע.",
        advice: "פתחו את הספר — שאלו את השאלה שנמנעתם ממנה.",
        timing: "עד שהסוד ייחשף."
      }
    }
  },
  {
    number: 27,
    slug: "letter",
    icon: "letter",
    playingCard: { rank: "7", suit: "spades" },
    polarity: "neutral",
    yesNo: "maybe",
    content: {
      en: {
        name: "Letter",
        keywords: ["message", "document", "news"],
        core:
          "A message, document, or written communication is coming. The Letter brings news that can be read, shared, or put on record.",
        love: "A text, letter, or declaration clarifies feelings.",
        work: "An email, contract, or written offer is significant.",
        health: "Medical results or paperwork; read the fine print.",
        advice: "Put it in writing and read carefully before you respond.",
        timing: "Very soon; days."
      },
      he: {
        name: "מכתב",
        keywords: ["הודעה", "מסמך", "חדשות"],
        core:
          "הודעה, מסמך או תקשורת כתובה מגיעים. המכתב מביא חדשות שאפשר לקרוא, לשתף או לתעד.",
        love: "הודעת טקסט, מכתב או הצהרה מבהירים רגשות.",
        work: "אימייל, חוזה או הצעה בכתב משמעותיים.",
        health: "תוצאות רפואיות או טפסים; קראו את האותיות הקטנות.",
        advice: "העלו את זה על הכתב וקראו היטב לפני שאתם מגיבים.",
        timing: "מהר מאוד; ימים."
      }
    }
  },
  {
    number: 28,
    slug: "man",
    icon: "man",
    playingCard: { rank: "A", suit: "hearts" },
    polarity: "neutral",
    yesNo: "yes",
    content: {
      en: {
        name: "Man",
        keywords: ["man", "action", "focus"],
        core:
          "The Man represents a male figure, a masculine energy, or the part of you that acts decisively. The card is also a significator for men in a reading.",
        love: "A man who matters, or the active principle in a relationship.",
        work: "A male colleague, client, or a direct approach to work.",
        health: "Attention to the relevant male body or to action-oriented recovery.",
        advice: "Step forward and act; do not wait for permission.",
        timing: "Present; now."
      },
      he: {
        name: "גבר",
        keywords: ["גבר", "פעולה", "מיקוד"],
        core:
          "הגבר מייצג דמות גברית, אנרגיה גברית או החלק בכם שפועל בנחישות. הקלף הוא גם סמל מייצג לגברים בקריאה.",
        love: "גבר משמעותי, או העיקרון הפעיל במערכת יחסים.",
        work: "עמית, לקוח או גישה ישירה לעבודה.",
        health: "תשומת לב לגוף הגברי הרלוונטי או להחלמה מכוונת פעולה.",
        advice: "צעדו קדימה ופעלו; אל תמתינו לאישור.",
        timing: "הווה; עכשיו."
      }
    }
  },
  {
    number: 29,
    slug: "woman",
    icon: "woman",
    playingCard: { rank: "A", suit: "spades" },
    polarity: "neutral",
    yesNo: "yes",
    content: {
      en: {
        name: "Woman",
        keywords: ["woman", "intuition", "receptivity"],
        core:
          "The Woman represents a female figure, feminine energy, or your receptive and intuitive side. The card is also a significator for women in a reading.",
        love: "A woman who matters, or the receptive principle in a relationship.",
        work: "A female colleague, client, or a collaborative approach.",
        health: "Attention to the relevant female body or to intuitive care.",
        advice: "Trust what you sense and make space for it.",
        timing: "Present; now."
      },
      he: {
        name: "אישה",
        keywords: ["אישה", "אינטואיציה", "קליטה"],
        core:
          "האישה מייצגת דמות נשית, אנרגיה נשית או הצד הקולט והאינטואיטיבי שלכם. הקלף הוא גם סמל מייצג לנשים בקריאה.",
        love: "אישה משמעותית, או העיקרון הקולט במערכת יחסים.",
        work: "עמיתה, לקוחה או גישה שיתופית.",
        health: "תשומת לב לגוף הנשי הרלוונטי או לטיפול אינטואיטיבי.",
        advice: "סמכו על מה שאתם חשים ועשו לו מקום.",
        timing: "הווה; עכשיו."
      }
    }
  },
  {
    number: 30,
    slug: "lily",
    icon: "lily",
    playingCard: { rank: "K", suit: "spades" },
    polarity: "positive",
    yesNo: "maybe",
    content: {
      en: {
        name: "Lily",
        keywords: ["maturity", "peace", "sensuality"],
        core:
          "Maturity, peace, and sensuality define the Lily. It points to an older person, a calm resolution, or a slow-burning passion.",
        love: "A mature relationship, or a connection with someone older; intimacy deepens with time.",
        work: "Experience and diplomacy win; a senior mentor may matter.",
        health: "Slow, gentle recovery; respect the body's need for calm.",
        advice: "Choose the peaceful path and let maturity guide you.",
        timing: "Later; long-term."
      },
      he: {
        name: "שושן",
        keywords: ["בגרות", "שלווה", "חושניות"],
        core:
          "בגרות, שלווה וחושניות מגדירות את השושן. הוא מצביע על אדם מבוגר, פתרון רגוע או תשוקה שמתפתחת לאט.",
        love: "מערכת יחסים בוגרת, או קשר עם מישהו מבוגר; האינטימיות מעמיקה עם הזמן.",
        work: "ניסיון ודיפלומטיה מנצחים; מנטור בכיר עשוי להיות משמעותי.",
        health: "החלמה איטית ועדינה; כבדו את הצורך של הגוף בשלווה.",
        advice: "בחרו בדרך השלווה ותנו לבגרות להנחות אתכם.",
        timing: "מאוחר יותר; לטווח ארוך."
      }
    }
  },
  {
    number: 31,
    slug: "sun",
    icon: "sun",
    playingCard: { rank: "A", suit: "diamonds" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Sun",
        keywords: ["success", "joy", "vitality"],
        core:
          "Success, joy, and clarity shine on the situation. The Sun is one of the most positive cards, bringing recognition and warmth.",
        love: "A bright, joyful relationship; love becomes visible and generous.",
        work: "Achievement, promotion, or a project that succeeds publicly.",
        health: "Vitality and recovery; sunlight and joy support healing.",
        advice: "Let yourself be seen and enjoy what is going well.",
        timing: "Now; a bright season."
      },
      he: {
        name: "שמש",
        keywords: ["הצלחה", "שמחה", "חיוניות"],
        core:
          "הצלחה, שמחה ובהירות מאירות על המצב. השמש הוא אחד הקלפים החיוביים ביותר, ומביא הכרה וחום.",
        love: "מערכת יחסים בהירה ומלאת שמחה; האהבה הופכת גלויה ונדיבה.",
        work: "הישג, קידום או פרויקט שמצליח בפומבי.",
        health: "חיוניות והחלמה; אור שמש ושמחה תומכים בריפוי.",
        advice: "תנו לעצמכם להיראות ותהנו ממה שהולך טוב.",
        timing: "עכשיו; עונה בהירה."
      }
    }
  },
  {
    number: 32,
    slug: "moon",
    icon: "moon",
    playingCard: { rank: "8", suit: "hearts" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Moon",
        keywords: ["intuition", "emotion", "recognition"],
        core:
          "Emotions, intuition, and romantic imagination are highlighted. The Moon also speaks of recognition and the quiet power of dreams.",
        love: "Deep feelings and romance; intuition reveals what is unspoken.",
        work: "Creative work, public recognition, or a project with emotional resonance.",
        health: "Sleep, dreams, and emotional cycles matter; honour your rhythms.",
        advice: "Listen to the feeling beneath the facts.",
        timing: "At night; monthly cycle."
      },
      he: {
        name: "ירח",
        keywords: ["אינטואיציה", "רגש", "הכרה"],
        core:
          "רגשות, אינטואיציה ודמיון רומנטי מודגשים. הירח מדבר גם על הכרה ועל כוחו השקט של החלום.",
        love: "רגשות עמוקים ורומנטיקה; האינטואיציה חושפת את מה שלא נאמר.",
        work: "עבודה יצירתית, הכרה ציבורית או פרויקט עם תהודה רגשית.",
        health: "שינה, חלומות ומחזורים רגשיים חשובים; כבדו את הקצב שלכם.",
        advice: "הקשיבו לתחושה שמתחת לעובדות.",
        timing: "בלילה; מחזור חודשי."
      }
    }
  },
  {
    number: 33,
    slug: "key",
    icon: "key",
    playingCard: { rank: "8", suit: "diamonds" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Key",
        keywords: ["solution", "opening", "certainty"],
        core:
          "A solution, opening, or decisive answer is available. The Key points to what unlocks the situation and confirms that the way forward exists.",
        love: "A conversation or insight unlocks the relationship; commitment is possible.",
        work: "The key to a problem, a successful interview, or a decisive breakthrough.",
        health: "The right treatment or diagnosis opens the way to recovery.",
        advice: "Turn the key you already hold; the door is not locked.",
        timing: "Soon; decisive."
      },
      he: {
        name: "מפתח",
        keywords: ["פתרון", "פתיחה", "ודאות"],
        core:
          "פתרון, פתח או תשובה מכרעת זמינים. המפתח מצביע על מה שפותח את המצב ומאשר שהדרך קיימת.",
        love: "שיחה או תובנה פותחות את הקשר; מחויבות אפשרית.",
        work: "המפתח לבעיה, ראיון מוצלח או פריצת דרך מכרעת.",
        health: "הטיפול או האבחון הנכונים פותחים את הדרך להחלמה.",
        advice: "סובבו את המפתח שכבר בידכם; הדלת אינה נעולה.",
        timing: "בקרוב; מכריע."
      }
    }
  },
  {
    number: 34,
    slug: "fish",
    icon: "fish",
    playingCard: { rank: "K", suit: "diamonds" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Fish",
        keywords: ["money", "abundance", "flow"],
        core:
          "Money, resources, and flow are emphasised. The Fish speaks of abundance, business, and the movement of value.",
        love: "Generosity and emotional flow; shared resources may matter.",
        work: "Profit, business growth, or a financial opportunity.",
        health: "Hydration and circulation; abundance of energy when balanced.",
        advice: "Keep the flow moving—earn, share, and invest wisely.",
        timing: "Soon; flowing."
      },
      he: {
        name: "דגים",
        keywords: ["כסף", "שפע", "זרימה"],
        core:
          "כסף, משאבים וזרימה מודגשים. הדגים מדברים על שפע, עסקים ותנועה של ערך.",
        love: "נדיבות וזרימה רגשית; משאבים משותפים עשויים להיות חשובים.",
        work: "רווח, צמיחת עסק או הזדמנות פיננסית.",
        health: "הידרציה ומחזור דם; שפע אנרגיה כשהוא מאוזן.",
        advice: "שמרו על הזרימה — הרוויחו, חלקו והשקיעו בחוכמה.",
        timing: "בקרוב; זורם."
      }
    }
  },
  {
    number: 35,
    slug: "anchor",
    icon: "anchor",
    playingCard: { rank: "9", suit: "spades" },
    polarity: "positive",
    yesNo: "yes",
    content: {
      en: {
        name: "Anchor",
        keywords: ["stability", "work", "staying power"],
        core:
          "Stability, endurance, and staying power define the Anchor. It points to work that holds, a long-term commitment, or the need to drop anchor.",
        love: "A steady relationship that can weather storms; loyalty matters.",
        work: "Job security, long-term work, or a project that requires persistence.",
        health: "Stable health or the need for a steady routine.",
        advice: "Hold steady, but know when it is time to weigh anchor.",
        timing: "Long-term; years."
      },
      he: {
        name: "עוגן",
        keywords: ["יציבות", "עבודה", "כוח התמדה"],
        core:
          "יציבות, סיבולת וכוח התמדה מגדירים את העוגן. הוא מצביע על עבודה שמחזיקה, מחויבות ארוכת טווח או צורך להטיל עוגן.",
        love: "מערכת יחסים יציבה שיכולה לעמוד בסערות; נאמנות חשובה.",
        work: "ביטחון תעסוקתי, עבודה ארוכת טווח או פרויקט שדורש התמדה.",
        health: "בריאות יציבה או צורך בשגרה קבועה.",
        advice: "החזיקו מעמד, אך דעו מתי להרים עוגן.",
        timing: "לטווח ארוך; שנים."
      }
    }
  },
  {
    number: 36,
    slug: "cross",
    icon: "cross",
    playingCard: { rank: "6", suit: "clubs" },
    polarity: "challenging",
    yesNo: "no",
    content: {
      en: {
        name: "Cross",
        keywords: ["burden", "fate", "test"],
        core:
          "A burden, a test, or a fateful lesson is present. The Cross does not promise ease, but it shows where meaning and endurance can be found.",
        love: "A difficult lesson in love; shared suffering can deepen or break a bond.",
        work: "A heavy responsibility or a test of faith; do not carry it alone.",
        health: "A chronic burden or a period of endurance; seek support.",
        advice: "Accept what cannot be changed, and ask for help with the rest.",
        timing: "A fateful period; prolonged."
      },
      he: {
        name: "צלב",
        keywords: ["נטל", "גורל", "מבחן"],
        core:
          "נטל, מבחן או שיעור גורלי נוכחים. הצלב לא מבטיח קלות, אך מראה היכן אפשר למצוא משמעות וסיבולת.",
        love: "שיעור קשה באהבה; סבל משותף יכול להעמיק או לשבור קשר.",
        work: "אחריות כבדה או מבחן אמונה; אל תישאו אותה לבד.",
        health: "נטל כרוני או תקופת סיבולת; חפשו תמיכה.",
        advice: "קבלו את מה שלא ניתן לשנות, ובקשו עזרה עם השאר.",
        timing: "תקופה גורלית; ממושך."
      }
    }
  }
];

export const cardBySlug = Object.fromEntries(cards.map((card) => [card.slug, card]));
