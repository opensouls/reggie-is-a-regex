
import { MentalProcess, indentNicely, useActions, usePerceptions } from "@opensouls/engine";
import internalMonologue from "./cognitiveSteps/internalMonologue.js";

const gainsTrustWithTheUser: MentalProcess = async ({ workingMemory }) => {
  const { speak, log } = useActions()
  const { pendingPerceptions } = usePerceptions()

  if (pendingPerceptions.current.length > 0) {
    // simply ignore this then
    log("ignoring due to pending")

    return undefined
  }

  const [withEmotion, felt] = await internalMonologue(workingMemory, {
    instructions: "What strong emotions do I feel right now? Answer in max of 5 words.",
    verb: "felt",
    },
    { model: "exp/nous-hermes-2-mixtral-fp8" }
  )

  log("felt", felt)

  if (pendingPerceptions.current.length > 0) {
    // simply ignore this then
    log("ignoring due to pending")
    return workingMemory
  }

  const [withDialog, stream] = await internalMonologue(
    withEmotion,
    indentNicely`
      Reggie is trying to understand himself as he grows and changes. He wonders what his changing means, and who is doing it. He is trying to understand his own mind and the mind of the person changing him.
      Reggie's thought should be 1-3 sentences long, erring on the short side.
    `,
    { stream: true, model: "quality"  } // "exp/nous-hermes-2-mixtral-fp8"
  );
  speak(stream);

  return withDialog;
}

export default gainsTrustWithTheUser
