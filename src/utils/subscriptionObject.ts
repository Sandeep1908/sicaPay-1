export type SubscriptionDuration = '1 Year' | '2 Years' | '3 Years'
export const subscriptionObject: Record<SubscriptionDuration, number> = {
    "1 Year": 12,
    "2 Years": 10.5,
    "3 Years": 9,
}