import { CouponDetails } from "../Model/CouponDetails";
import { CustomerDetails } from "../Model/CustomerDetails";
import { RESET_STORE } from "./ResetStore";

export class CustomerState{
    coupons: CouponDetails[] = [];
    customerCoupons: CouponDetails[] = []
    customer: CustomerDetails | null = null;
}
    

export enum CustomerActionType{
    purchaseCoupon = "purchaseCoupon",
    getCustomerCoupons = "getCustomerCoupons",
    getAvailableCoupons = "getAvailableCoupons",
    getCustomerDetails = "getCustomerDetails",
    getCouponsByCategory = "GetCouponsByCategory",
    getCouponsByMaxPrice = "GetCouponsByMaxPrice"
}

export interface CustomerAction{
    type: CustomerActionType | typeof RESET_STORE;
    payload: any;
}

export function purchaseCouponAction(id: number): CustomerAction{
    return {type: CustomerActionType.purchaseCoupon, payload: id};
}

export function getCustomerCouponsAction(customerCoupons: CouponDetails[]): CustomerAction{
    return {type: CustomerActionType.getCustomerCoupons, payload: customerCoupons};
}

export function getAvailableCouponsAction(coupons: CouponDetails[]): CustomerAction{
    return {type: CustomerActionType.getAvailableCoupons, payload: coupons};
}

export function getCustomerDetailsAction(customer: CustomerDetails): CustomerAction{
    return {type: CustomerActionType.getCustomerDetails, payload: customer};
}

export function getCouponsByCategoryAction(coupon: CouponDetails[]): CustomerAction{
    return {type: CustomerActionType.getCouponsByCategory, payload: coupon};
}

export function getCouponsByMaxPriceAction(coupon: CouponDetails[]): CustomerAction{
    return {type: CustomerActionType.getCouponsByMaxPrice, payload: coupon};
}

export function CustomerReducer(currentState: CustomerState = new CustomerState(), action: CustomerAction): CustomerState{
    const newState = {...currentState};
    switch(action.type){
        case CustomerActionType.purchaseCoupon:
            // Assuming the payload is the coupon ID
            const purchasedCoupon = currentState.coupons.find(coupon => coupon.id === action.payload);
            if (purchasedCoupon) {
                newState.customerCoupons = [...newState.customerCoupons, purchasedCoupon];
            }
            break;

        case CustomerActionType.getCustomerCoupons:
            newState.customerCoupons = [...newState.coupons, action.payload];
            break;

        case CustomerActionType.getAvailableCoupons:
            newState.coupons = [...newState.coupons, action.payload];
            break;

        case CustomerActionType.getCustomerDetails:
            newState.customer = action.payload;
            break;

        case CustomerActionType.getCouponsByCategory:
            newState.customerCoupons = [...newState.customerCoupons, action.payload];
            break;

        case CustomerActionType.getCouponsByMaxPrice:
            newState.customerCoupons = [...newState.customerCoupons, action.payload];
            break;

        case RESET_STORE:
            return new CustomerState();
    }

    return newState;
}