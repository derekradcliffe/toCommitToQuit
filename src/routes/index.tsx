import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [commitMsg, setCommitMsg] = useState("");
  const [handleTextCopyClick, setHandleTextCopyClick] = useState(false);

  const copyTextToClipboard = async () => {
    try {
      const textToCopy = document.querySelector("code");

      setHandleTextCopyClick(true);

      await navigator.clipboard.writeText(textToCopy?.innerHTML as string);

      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleClick = () => {
    fetch("https://whatthecommit.com/index.txt")
      .then((response) => response.text())
      .then((data) => setCommitMsg(data.trim()))
      .catch((error) => console.error("Error:", error));

    setHandleTextCopyClick(false);
  };

  return (
    <div className="flex justify-center flex-col text-center max-w-[100%] ml-auto mr-auto bg-neutral-400 h-[100vh]">
      <div className='text-8xl text-white mb-[1rem] font-modak font-normal'>To Commit To Quit</div>

      <div className="text-white">
        Are you sick and tired of generating commit messages? Just click
        "generate", then copy and paste!
      </div>

      <code
        onClick={copyTextToClipboard}
        className="bg-neutral-700 flex text-white mb-[1rem] mt-[1rem] max-w-[60%] justify-center rounded-sm p-[0.5rem] align-middle ml-auto mr-auto cursor-pointer"
      >
        git commit -m '{commitMsg}'
      </code>

      {handleTextCopyClick ? <div className="bg-neutral-700 w-max ml-auto mr-auto mb-[1rem] p-[1rem] rounded-sm text-white animate-slide"> Copied to Clipboard!</div> : <></>}

      <Button
        onClick={handleClick}
        variant="defaultOpt2"
        className="md:w-[20%] w-[80%] ml-auto mr-auto"
      >
        Generate
      </Button>
    </div>
  );
}
