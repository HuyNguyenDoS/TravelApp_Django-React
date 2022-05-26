import React from "react";

export default function PreLoader() {
    return (
        <div className="loader-wrap">
            <div className="preloader">
                <div className="preloader-close">Preloader Close</div>
                <div id="handle-preloader" className="handle-preloader">
                    <div className="animation-preloader">
                        <div className="spinner" />
                        <div className="txt-loading">
                            <span data-text-preloader="t" className="letters-loading">
                                t
                            </span>
                            <span data-text-preloader="r" className="letters-loading">
                                r
                            </span>
                            <span data-text-preloader="a" className="letters-loading">
                                a
                            </span>
                            <span data-text-preloader="v" className="letters-loading">
                                v
                            </span>
                            <span data-text-preloader="e" className="letters-loading">
                                e
                            </span>
                            <span data-text-preloader="l" className="letters-loading">
                                l
                            </span>
                            <span data-text-preloader="t" className="letters-loading">
                                t
                            </span>
                            <span data-text-preloader="o" className="letters-loading">
                                o
                            </span>
                            <span data-text-preloader="u" className="letters-loading">
                                u
                            </span>
                            <span data-text-preloader="r" className="letters-loading">
                                r
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
