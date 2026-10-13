"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const destinations = [
  {
    city: "Doha",
    country: "Qatar",
    image: "/travel/doha.jpg",
    focus: "center 58%",
    lat: 25.2854,
    lng: 51.531
  },
  {
    city: "Istanbul",
    country: "Turkey",
    image: "/travel/istanbul.jpg",
    focus: "center 45%",
    lat: 41.0082,
    lng: 28.9784
  },
  {
    city: "Cappadocia",
    country: "Turkey",
    image: "/travel/cappadocia.jpg",
    focus: "center 57%",
    lat: 38.6431,
    lng: 34.8289
  },
  {
    city: "Ankara",
    country: "Turkey",
    image: "/travel/ankara.jpg",
    focus: "center 54%",
    lat: 39.9334,
    lng: 32.8597
  },
  { city: "Izmir", country: "Turkey", lat: 38.4237, lng: 27.1428 },
  {
    city: "Jeddah",
    country: "Saudi Arabia",
    image: "/travel/jeddah.jpg",
    focus: "center 50%",
    lat: 21.4858,
    lng: 39.1925
  },
  {
    city: "Mecca",
    country: "Saudi Arabia",
    image: "/travel/mecca.jpg",
    focus: "center 46%",
    lat: 21.3891,
    lng: 39.8579
  },
  {
    city: "Medinah",
    country: "Saudi Arabia",
    image: "/travel/medinah.webp",
    focus: "center 60%",
    lat: 24.5247,
    lng: 39.5692
  },
  {
    city: "Probolinggo",
    country: "Indonesia",
    note: "hometown!",
    lat: -7.7569,
    lng: 113.2115
  },
  {
    city: "Central Jakarta",
    country: "Indonesia",
    note: "where I'm living now",
    lat: -6.1865,
    lng: 106.8341
  }
];

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function polaroid(place) {
  const image =
    place.image ??
    `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/pin-s+ef2b2d(${place.lng},${place.lat})/${place.lng},${place.lat},10/320x220@2x?access_token=${accessToken}`;
  const title = place.note ? `${place.city}, ${place.country}` : place.city;
  const detail = place.note ? `(${place.note})` : place.country;

  return `
    <article class="travel-polaroid">
      <img src="${image}" alt="Travel view of ${place.city}" style="object-position: ${place.focus ?? "center"}" />
      <strong>${title}</strong>
      <span>${detail}</span>
    </article>
  `;
}

export default function TravelPage() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!accessToken) return;

    let map;
    let disposed = false;

    async function initializeMap() {
      const { default: mapboxgl } = await import("mapbox-gl");
      if (disposed || !mapContainerRef.current) return;

      const width = mapContainerRef.current.clientWidth;

      map = new mapboxgl.Map({
        accessToken,
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/standard-satellite",
        projection: "globe",
        center: [39, 31],
        zoom: width < 360 ? 0.9 : width < 480 ? 1.1 : width < 900 ? 1.9 : 2.3,
        attributionControl: false,
        config: {
          basemap: {
            showPlaceLabels: true,
            showRoadLabels: true,
            showRoadsAndTransit: true,
            showPedestrianRoads: false
          }
        }
      });

      map.on("style.load", () => {
        map.setFog({
          color: "rgb(186, 210, 235)",
          "high-color": "rgb(36, 92, 223)",
          "horizon-blend": 0.02,
          "space-color": "rgb(2, 3, 10)",
          "star-intensity": 0.55
        });
      });

      destinations.forEach((place) => {
        const popup = new mapboxgl.Popup({
          offset: 28,
          className: "travel-polaroid-popup"
        });
        let popupLoaded = false;

        popup.on("open", () => {
          if (popupLoaded) return;
          popup.setHTML(polaroid(place));
          popupLoaded = true;
        });

        const marker = new mapboxgl.Marker({
          color: "#ef2b2d",
          scale: width < 480 ? 0.68 : width < 900 ? 0.78 : 0.9
        })
          .setLngLat([place.lng, place.lat])
          .setPopup(popup)
          .addTo(map);

        marker
          .getElement()
          .setAttribute("aria-label", `${place.city}, ${place.country}`);
      });

      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(new mapboxgl.AttributionControl(), "top-right");
    }

    void initializeMap();

    return () => {
      disposed = true;
      map?.remove();
    };
  }, []);

  return (
    <main className="travel-globe-page">
      <div ref={mapContainerRef} className="travel-globe-map" />

      {!accessToken && (
        <div
          role="alert"
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: 14
          }}
        >
          Set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in .env.local
        </div>
      )}

      <Link
        href="/"
        aria-label="Back to home"
        className="travel-globe-back"
      >
        ←
      </Link>

      <div className="travel-globe-title">
        <strong>I have visited...</strong>
        <span>Click the marker!</span>
      </div>

      <style jsx global>{`
        .travel-globe-page {
          width: 100%;
          height: 100svh;
          height: 100dvh;
          position: relative;
          overflow: hidden;
          background: #02030a;
        }

        .travel-globe-map {
          width: 100%;
          height: 100%;
        }

        .travel-globe-back {
          position: absolute;
          z-index: 2;
          top: max(20px, env(safe-area-inset-top));
          left: max(20px, env(safe-area-inset-left));
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 50%;
          background: rgba(4, 8, 20, 0.62);
          color: #fff;
          font-size: 22px;
          line-height: 1;
          text-decoration: none;
          backdrop-filter: blur(12px);
        }

        .travel-globe-title {
          width: min(260px, calc(100% - 160px));
          position: absolute;
          z-index: 2;
          top: max(24px, env(safe-area-inset-top));
          left: 50%;
          color: #fff;
          text-align: center;
          pointer-events: none;
          transform: translateX(-50%);
          text-shadow: 0 2px 18px #000;
        }

        .travel-globe-title strong,
        .travel-globe-title span {
          display: block;
        }

        .travel-globe-title strong {
          font-size: 14px;
          letter-spacing: 2px;
        }

        .travel-globe-title span {
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 11px;
        }

        .travel-polaroid-popup .mapboxgl-popup-content {
          width: clamp(174px, 52vw, 200px);
          padding: 10px 10px 16px;
          border-radius: 2px;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.4);
          transform: rotate(-2deg);
        }

        .travel-polaroid-popup .mapboxgl-popup-close-button {
          top: 11px;
          right: 11px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: #111;
          font-size: 19px;
          line-height: 22px;
        }

        .travel-polaroid {
          color: #242424;
          font-family: "Courier New", monospace;
          text-align: center;
        }

        .travel-polaroid img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          margin-bottom: 12px;
          object-fit: cover;
          background: #d9d9d9;
        }

        .travel-polaroid strong,
        .travel-polaroid span {
          display: block;
        }

        .travel-polaroid strong {
          font-size: 14px;
        }

        .travel-polaroid span {
          margin-top: 3px;
          color: #555;
          font-size: 11px;
        }

        @media (max-width: 900px) and (min-width: 641px) {
          .mapboxgl-ctrl-top-right {
            top: 54px;
          }
        }

        @media (max-width: 640px) {
          .travel-globe-back {
            top: max(12px, env(safe-area-inset-top));
            left: max(12px, env(safe-area-inset-left));
          }

          .travel-globe-title {
            width: calc(100% - 136px);
            top: max(16px, env(safe-area-inset-top));
          }

          .travel-globe-title strong {
            font-size: clamp(11px, 3.8vw, 14px);
            letter-spacing: 1.4px;
          }

          .travel-globe-title span {
            font-size: 10px;
          }

          .mapboxgl-ctrl-top-right {
            top: max(8px, env(safe-area-inset-top));
            right: max(8px, env(safe-area-inset-right));
          }

          .mapboxgl-ctrl-bottom-right {
            right: max(8px, env(safe-area-inset-right));
            bottom: max(8px, env(safe-area-inset-bottom));
          }

          .travel-polaroid-popup .mapboxgl-popup-content {
            padding: 8px 8px 13px;
          }

          .travel-polaroid img {
            margin-bottom: 9px;
          }

          .travel-polaroid strong {
            font-size: 12px;
          }

          .travel-polaroid span {
            font-size: 10px;
          }
        }
      `}</style>
    </main>
  );
}
