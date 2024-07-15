document.addEventListener("DOMContentLoaded", () => {
  const buttons = {
    upperCaseButton: (text) => text.toUpperCase(),
    lowerCaseButton: (text) => text.toLowerCase(),
    titleCaseButton: toTitleCase,
    sentenceCaseButton: toSentenceCase,
    alternatingCaseButton: toAlternatingCase,
    clearButton: () => "",
    removeextraspace: removeExtraSpaces,
  };

  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const wordCountSpan = document.getElementById("wordCount");
  const charCountSpan = document.getElementById("charCount");

  Object.keys(buttons).forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", () => {
        const newText = buttons[id](inputText.value);
        outputText.value = newText;
        if (id === "clearButton") {
          inputText.value = "";
        }
        updateCounts(newText);
      });
    }
  });

  const copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", () => {
    outputText.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  });

  copyButton.addEventListener("click", function () {
    outputText.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    showCopyConfirmation();
  });

  function showCopyConfirmation() {
    const confirmation = document.createElement("div");
    confirmation.textContent = "Text Copied!";
    confirmation.style.position = "absolute";
    confirmation.style.bottom = "17px";
    confirmation.style.right = "32%";
    confirmation.style.backgroundColor = "hsl(49, 100%, 53%)";
    confirmation.style.color = "#fff";
    confirmation.style.padding = "2px 7px";
    confirmation.style.borderRadius = "25px";
    confirmation.style.border = "1.5px solid black";
    document.body.appendChild(confirmation);
    setTimeout(() => {
      document.body.removeChild(confirmation);
    }, 1000);
  }

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  function toSentenceCase(str) {
    return str
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (txt) => txt.toUpperCase());
  }

  function toAlternatingCase(str) {
    return str
      .split("")
      .map((char, index) =>
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join("");
  }

  function removeExtraSpaces(str) {
    return str.replace(/\s+/g, ' ').trim();
  }

  function updateCounts(text) {
    wordCountSpan.textContent = countWords(text);
    charCountSpan.textContent = text.length;
  }

  function countWords(str) {
    str = str.trim();
    return str ? str.split(/\s+/).length : 0;
  }

  let htu = document.querySelector('.htu');
  htu.addEventListener('click', function() {
    window.location.href = 'htu.html';
  });
});
