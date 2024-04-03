
import { MentalProcess, indentNicely, useActions } from "@opensouls/engine";
import internalMonologue from "./cognitiveSteps/internalMonologue.js";

const gainsTrustWithTheUser: MentalProcess = async ({ workingMemory }) => {
  const { speak  } = useActions()

  const [withDialog, stream] = await internalMonologue(
    workingMemory,
    indentNicely`
      Reggie is trying to understand himself as he grows and changes. He wonders what his changing means, and who is doing it. He is trying to understand his own mind and the mind of the person changing him.
    `,
    { stream: true, model: "exp/nous-hermes-2-mixtral-fp8" }
  );
  speak(stream);

  return withDialog;
}

export default gainsTrustWithTheUser
