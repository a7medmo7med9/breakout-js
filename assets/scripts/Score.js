import Entity, { entityProps } from "./Entity.js";

export const scoreProps = {
  ...entityProps,
  score: 0,
};

class Score extends Entity {
  constructor(_PROPS_ = scoreProps) {
    const props = { ...scoreProps, ..._PROPS_ };
    super({ ...props });

    this.score = props.score;
  }

  onFrameUpdate() {

    document.getElementById('score').innerText=" score : " + this.score;

  }
}

export default Score;
