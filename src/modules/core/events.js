/**
 * Core event bus implementation for inter-module communication
 */
export class EventBus {
  subscribers = {};

  /**
   * Subscribe to an event
   * @param {string} event - Event name to subscribe to
   * @param {Function} callback - Callback function to execute when event is published
   * @returns {Function} Unsubscribe function
   */
  subscribe(event, callback) {
    if (!this.subscribers[event]) this.subscribers[event] = [];
    this.subscribers[event].push(callback);
    return () => this.unsubscribe(event, callback);
  }

  /**
   * Publish an event with data
   * @param {string} event - Event name to publish
   * @param {any} data - Data to pass to subscribers
   */
  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach(callback => callback(data));
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name to unsubscribe from
   * @param {Function} callback - Callback function to remove
   */
  unsubscribe(event, callback) {
    if (!this.subscribers[event]) return;
    this.subscribers[event] = this.subscribers[event]
      .filter(cb => cb !== callback);
  }
}

// Singleton instance to be used throughout the app
export const eventBus = new EventBus();