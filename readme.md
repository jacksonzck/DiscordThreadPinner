Installation process:

1. Download the git repository.
2. Install node and npm. 
3. Run npm install in the folder.
4. Make your discord developer bot. 
5. Make a file called ".env" in this folder. 
6. In that file, put TOKEN=(Your token) on the first line.
7. Put CLIENT_ID=(Your Client ID) on the second.
8. Save your .env file.
9. Run node deploy-commands.js
10. Give it a few minutes to percolate. 
11. Run node index.js
12. You're good to go!
13. Anytime you want to start it up again, run node index.js
14. Information of which channels to enable are stored in the data directory in json format, and persists across runs. 

To invite the bot to the server - https://discord.com/oauth2/authorize?client_id=123456789012345678&permissions=8192&scope=bot%20applications.commands

Where 12345... is your client id. 