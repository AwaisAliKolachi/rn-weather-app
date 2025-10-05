import { getLocationErrorMessage } from '@src/constants';
import { useEffect, useState, useCallback } from 'react';
import GetLocation, {
  Location,
  LocationErrorCode,
} from 'react-native-get-location';

const useLocation = (routeLocation: any) => {
  const [location, setLocation] = useState<Location | undefined>();
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | undefined>(
    undefined
  );

  const fetchLocation = useCallback(() => {
    if (routeLocation) {
      setLocation(routeLocation);
      return;
    }

    setIsFetchingLocation(true);
    setLocationError(undefined);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(loc => {
        setLocation(loc);
        setLocationError(undefined);
      })
      .catch(err => {
        const { code } = err;
        const errorMessage = getLocationErrorMessage(code as LocationErrorCode);
        setLocationError(errorMessage);
        setLocation(undefined);
      })
      .finally(() => {
        setIsFetchingLocation(false);
      });
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return {
    location,
    setLocation,
    isFetchingLocation,
    locationError,
    getLocation: fetchLocation,
  };
};

export default useLocation;
