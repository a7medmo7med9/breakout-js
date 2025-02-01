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
    this.BreakoutGame.context.font = "20px sans-serif";
    this.BreakoutGame.context.fillStyle = this.color;
    this.BreakoutGame.context.fillText(this.score, this.x, this.y);
  }
}

export default Score;
