function isCustomValue(value: SchemaValue): value is CustomSchemaValue {
  return (
    value != null &&
    value != undefined &&
    typeof value === "object" &&
    "type" in value &&
    value.type === "custom"
  );
}

export function validatePayload<T>(
  body: Record<string, any>,
  schema: Schema<T>
): boolean {
  for (const key in body) {
    if (!(key in schema)) {
      return false;
    }
  }
  for (const key in schema) {
    const expectedValueType = schema[key] as SchemaValue;
    const payloadValue = body[key];
    if (expectedValueType === "string" && typeof payloadValue !== "string") {
      console.log(
        `Key: ${key} was supposed to be ${expectedValueType}, but it was ${typeof payloadValue}`
      );
      return false;
    } else if (
      expectedValueType === "number" &&
      typeof payloadValue !== "number"
    ) {
      console.log(
        `Key: ${key} was supposed to be ${expectedValueType}, but it was ${typeof payloadValue}`
      );
      return false;
    } else if (
      expectedValueType === "boolean" &&
      typeof payloadValue !== "boolean"
    ) {
      console.log(
        `Key: ${key} was supposed to be ${expectedValueType}, but it was ${typeof payloadValue}`
      );
      return false;
    } else if (expectedValueType === "date") {
      const parsedDate = new Date(payloadValue);
      if (typeof parsedDate === "string" || isNaN(parsedDate.getTime())) {
        console.log(
          `Key: ${key} was supposed to be ${expectedValueType}, but it was not`
        );
        return false;
      }
    } else if (expectedValueType === "array" && !Array.isArray(payloadValue)) {
      console.log(
        `Key: ${key} was supposed to be ${expectedValueType}, but it was not`
      );
      return false;
    } else if (
      isCustomValue(expectedValueType) &&
      !expectedValueType.validate(payloadValue)
    ) {
      console.log(
        `Key: ${key} was supposed to be ${
          expectedValueType.type
        }, but it was ${typeof payloadValue} | this is custom type check`
      );
      return false;
    }
  }
  console.log("payload is valid");
  return true;
}
