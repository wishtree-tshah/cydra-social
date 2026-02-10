const mammoth = require("mammoth");
const fs = require("fs");

mammoth.extractRawText({ path: "Cydra Social - User Stories.docx" })
    .then(function (result) {
        fs.writeFileSync("user_stories_full.md", result.value, "utf8");
        console.log("Content extracted successfully!");
    })
    .catch(function (error) {
        console.error("Error:", error);
    });
