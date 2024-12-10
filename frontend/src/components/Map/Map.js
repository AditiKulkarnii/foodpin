import React, { useEffect, useState, useCallback } from 'react';
import classes from './map.module.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { toast } from 'react-toastify';
import { useLoading } from '../../Hooks/useLoading';

export default function Map({ readonly, location, onChange }) {
    const memoizedOnChange = useCallback(onChange, []); // Wrap onChange in useCallback

    return (
        <div className={classes.container}>
            <MapContainer
                className={classes.map}
                center={[0, 0]}
                zoom={1}
                dragging={!readonly}
                touchZoom={!readonly}
                doubleClickZoom={!readonly}
                scrollWheelZoom={!readonly}
                boxZoom={!readonly}
                keyboard={!readonly}
                attributionControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <FindButtonAndMarker
                    readonly={readonly}
                    location={location}
                    onChange={memoizedOnChange}
                />
            </MapContainer>
        </div>
    );
}

function FindButtonAndMarker({ readonly, location, onChange }) {
    const [position, setPosition] = useState(location);
    const { showLoading, hideLoading } = useLoading();

    const map = useMapEvents({
        click(e) {
            if (!readonly) setPosition(e.latlng);
        },
        locationfound(e) {
            hideLoading();
            setPosition(e.latlng);
            map.flyTo(e.latlng, 17);
        },
        locationerror(e) {
            hideLoading();
            toast.error(e.message);
        },
    });

    useEffect(() => {
        if (readonly) {
            map.setView(position, 17);
            return;
        }

        if (position) onChange(position);
    }, [position, map, onChange, readonly]); // Add all dependencies here

    const handleFindLocation = async () => {
        showLoading();
        await map.locate();
    };

    return (
        <>
            {!readonly && (
                <button
                    type="button"
                    className={classes.find_location}
                    onClick={handleFindLocation}
                >
                    Find My Location
                </button>
            )}
            {position && (
                <Marker
                    eventHandlers={{
                        dragend: e => {
                            setPosition(e.target.getLatLng());
                        },
                    }}
                    position={position}
                    draggable={!readonly}
                >
                    <Popup>Shipping Location</Popup>
                </Marker>
            )}
        </>
    );
}
