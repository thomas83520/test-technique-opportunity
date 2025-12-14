export const initialNodes = [
  {
    data: { label: "start" },
    id: "1",
    position: { x: 0, y: 0 },
    type: "start",
  },
];

export const STEP_TYPE = {
  START: "start",
  END: "end",
  EMAIL: "email",
  SMS: "sms",
  CUSTOM: "custom",
};

export const NODE_TYPE = {
  START: "start",
  END: "end",
  ACTION: "action",
};

export const HADNLE_TYPE = { SUCCESS: "success", FAIL: "fail", NEXT: "next" };
