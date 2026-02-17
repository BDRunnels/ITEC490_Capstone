import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

const CVE = ({cveData}) => {
    return (
        <div className="container mt-4 mb-5">
            <h2 className="mt-2 mb-4 text-center text-white">Latest CVEs from NVD</h2>
            <div className="row">
                {cveData.map((item) => {
                    const cve = item.cve;
                    return (
                        <div className="col-md-6 mb-3" key={cve.id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title text-black">{cve.id}</h5>
                                    <p className="text-black">{cve.descriptions[0]?.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      );
}

export default CVE;