import { IAddress, IAddressComponents } from "../state-structures";

export function parseAddress(addressAPIArray: IAddressComponents[]): IAddress {
    let address: IAddress = {
        placeId: "",
        streetNumber: "",
        route: "",
        locality: "",
        administrativeAreaLevel1: "",
        country: "",
        postalCode: "",
    };

    addressAPIArray.forEach((addresscomponent) => {
        addresscomponent.types.forEach((type) => {
            switch (type) {
                case "street_number":
                    address.streetNumber = addresscomponent.short_name
                    break;
                case "postal_code":
                    address.postalCode = addresscomponent.short_name
                    break;
                case "route":
                    address.route = addresscomponent.short_name
                    break;
                case "locality":
                    address.locality = addresscomponent.short_name
                    break;
                case "administrative_area_level_1":
                    address.administrativeAreaLevel1 = addresscomponent.short_name
                    break;
                case "country":
                    address.country = addresscomponent.long_name
                    break;
                default:
                    break;
            }
        });
    });

    address.placeId = `${address.streetNumber} ${address.route}, ${address.locality}, ${address.administrativeAreaLevel1}, ${address.postalCode}, ${address.country}`
    address.placeId = address.placeId.trim();
    
    return address;
}
