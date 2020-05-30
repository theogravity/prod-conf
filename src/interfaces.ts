export interface ICerebroConfigEntry {
  setting: string
  value: any
  except?: ICerebroConfigEntryException[]
}

export type ICerebroConfigEntryException = {
  value: any
  [key: string]: any
}

export interface ICerebroOptions {
  customEvaluators?: Record<string, Function>
}

export interface ICerebroContext {
  percentageSeed?: string | number
  [key: string]: any
}

export interface ICerebroConfigOptions {
  overrides?: Record<string, any>
}

export interface ICerebroConfigParams {
  /**
   * Map of setting name : array of labels
   */
  labels: Record<string, Array<string>>
  /**
   * Map of label : setting value
   */
  labelResolved: Record<string, any>
  /**
   * The resolved configuration object
   */
  answers: Record<string, any>
}

export interface ICerebroConfig {
  /**
   * Gets the requested value in its raw form. No checks are performed on it.
   *
   * @param {String} name The name of the setting that you want to value of
   * @return {*} The value of the setting
   */
  getRawValue<T = any>(name: string): T
  /**
   * Gets the requested value if it is a Boolean.  Returns null if the value does not exist.
   * Throws an error if the requested value is not a Boolean.
   *
   * @param {String} name The name of the setting that you want to value of
   * @return {Boolean|null} The value of the setting
   */
  isEnabled(name: string): boolean
  /**
   * Gets the requested value as an object. Returns null if the value does not exist or is not an object.
   * @param {String} name The name of the setting that you want to value of
   * @return {Object|null} The value of the setting
   */
  getObject<U = any>(name: string): Record<string, U>
  /**
   * Gets the requested value as an integer. Returns null if the value does not exist or is not a number.
   * @param {String} name The name of the setting that you want to value of
   * @return {Number|null} The value of the setting
   */
  getInt(name: string): number
  /**
   * Gets the requested value as a float. Returns null if the value does not exist or is not a number.
   * @param {String} name The name of the setting that you want to value of
   * @return {Number|null} The value of the setting
   */
  getFloat(name: string): number
  /**
   * Gets the requested value as an array. Returns null if the value does not exist or is not an array.
   * @param {String} name The name of the setting that you want to value of
   * @return {Array|null}
   */
  getArray<T = any>(name: string): Array<T>
  /**
   * Gets the requested value as a string. Returns null if the value does not exist or is not a string.
   * @param {String} name The name of the setting that you want to value of
   * @return {String|null}
   */
  getString(name: string): string
  /**
   * Gets the requested value if it is not a Boolean.  Returns null if the value does not exist.
   * Throws an error if the requested value is a Boolean.
   *
   * @param {String} name The name of the setting that you want to value of
   * @return {!Boolean|*} The value of the setting
   */
  getValue<T = any>(name: string): T
  /**
   * Serializes the object to send to the client.
   * Intended to be used on the server.
   * The output of this function must be rehydrated on the client.
   *
   * @return {JSON} Map of settings to values.
   */
  dehydrate(): string
  /**
   * Returns the resolved configuration as an object.
   * NOTE: This does not deep clone the object, which means that clients could abuse this
   * by changing values.  Doing a deep clone will obviously impact performance.
   *
   * @return {Object} The resolved config.
   */
  getRawConfig(): Record<string, any>
  /**
   * Returns the labels from the entries
   *
   * @return {Object} The labels as an object just like getRawConfig,
   * where each key is setting name and its value is an array of string labels.
   * Entries with no labels are represented as an empty array (not undefined).
   */
  getLabels(): Record<string, any>
  /**
   * Gets configuration categorized under a specific label.
   *
   * Returns null if the label does not exist.
   */
  getConfigForLabel(label: string): Record<string, any>
}

export type DynamicConfigBuilder = (
  context: Record<string, any>,
  overrides?: Record<string, any>
) => ICerebroConfig
