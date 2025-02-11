const sql = require("./db");

const initDatabase = async () => {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        text TEXT NOT NULL,
        added TIMESTAMP NOT NULL
    );
`;

    const existingCount = await sql`SELECT COUNT(*) FROM messages;`;
    if (existingCount[0].count < 15) {
      //Adding messages that were already posted (removing some that were inappropriate)

      await sql`
      INSERT INTO messages (username, text, added) 
      VALUES 
        ('Adoring Fan', 'By Azura, by Azura, by Azura! It''s the Grand Champion! I can''t believe it''s you! Standing here! Next to me!', '2025-01-29 15:11:12'),
        ('Imperial Watch', 'Stop right there, criminal scum! Nobody breaks the law on my watch! I''m confiscating your stolen goods. Now pay your fine or it''s off to jail.', '2025-01-29 15:11:35'),
        ('Sheogorath', 'Wonderful! Time for a celebration... Cheese for everyone! Wait, scratch that. Cheese for no one. That can be just as much of a celebration, if you don''t like cheese. True?', '2025-01-29 15:14:37'),
        ('tutf', 'jfjf', '2025-02-10 19:58:04'),
        ('Ajay', 'hmmm sweet Ui', '2025-01-30 06:25:50'),
        ('Megatron', 'Watsupp', '2025-01-30 06:28:42'),
        ('nm', 'jjj', '2025-01-30 08:10:33'),
        ('ddd', 'zdxgvb', '2025-01-30 21:17:21'),
        ('bhk', 'helloooo', '2025-01-31 08:01:09'),
        ('Houdini', 'This looks amazing!', '2025-01-31 15:41:42'),
        ('Hey', 'This is a message that should be posted to that of the global messages enumeration on the home page.', '2025-02-02 04:30:37'),
        ('wee', 'asasd', '2025-02-08 15:42:23'),
        ('helo', 'I rly rly rly rly want to be a software engineer and find a job :D hoping 2025 is good, wishing everyone the best', '2025-02-09 00:32:33'),
        ('<script>alert(''Hacker'')</script>', 'Test on escaping <script>alert(''Hacker'')</script>', '2025-02-09 14:57:11'),
        ('Ride or Die', 'le message', '2025-02-09 22:28:19'),
        ('Dr.Kleiner', 'Bro we blew up the Black Mesa facility', '2025-02-10 19:58:04');
      `;
    } else {
      console.log("Database already contains messages, skipping creation.");
    }
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
};

module.exports = initDatabase;
