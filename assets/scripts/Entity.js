import { isFloat } from "./utils.js";

export const entityProps = {
  BreakoutGame: null,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  color: "lightgreen",
};
class Entity {
  constructor(_PROPS_ = entityProps) {
    const props = { ...entityProps, ..._PROPS_ };

    this.BreakoutGame = props.BreakoutGame;
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.color = props.color;
  }

  setSize(width, height) {
    const widthResult = isFloat(width);
    if (widthResult.status) this.width = widthResult.value;

    const heightResult = isFloat(height);
    if (heightResult.status) this.height = heightResult.value;
  }
  getSize() {
    return { width: this.width, height: this.height };
  }

  setPosition(x, y) {
    const xResult = isFloat(this.x);
    if (xResult.status) this.x = xResult.value;
    const yResult = isFloat(this.y);
    if (yResult.status) this.y = yResult.value;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  /**
   * this function get call every event
   * @param {Event} event
   * @abstract
   * @void
   */
  eventTrigger(event) {
    throw "Abstract method eventTrigger not implemented";
  }

  /**
   * this function get call every frame update
   *
   * @abstract
   * @void
   */
  onFrameUpdate() {
    throw "Abstract method onFrameUpdate not implemented";
  }
}

export default Entity;
