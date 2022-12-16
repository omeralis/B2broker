// <reference lib="webworker" />

import { PseudoSocketGeneration } from "../shared/model/pseudo-socket";

addEventListener('message', ({ data }) => {
  const pseudoSocketGeneration = new PseudoSocketGeneration();
  const response = pseudoSocketGeneration.pseudoSocket(data);
  postMessage(response);
});
