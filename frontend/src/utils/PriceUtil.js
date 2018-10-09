export default class PriceUtil {
  //region Properties
  static _locale = null;
  static _currency = null;
  //endregion

  //region Methods
  static formatPrice(value) {
    return Number(value).toLocaleString(this._locale, {
      style: 'currency',
      currency: this._currency,
    });
  }
  //endregion

  //region Getters and Setters
  static set locale(locale) {
    this._locale = locale;
  }

  static get locale() {
    return this._locale;
  }

  static set currency(currency) {
    this._currency = currency;
  }

  static get currency() {
    return this._currency;
  }
  //endregion
}