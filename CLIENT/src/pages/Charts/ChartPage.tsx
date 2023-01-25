
import { useContext, useState, useEffect } from "react";
import axiosInstance from "../../server/index.axios";
import React from 'react';

import {
    VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme
} from 'victory';


function Chart() {
    const [topVcData, setTopVcData] = useState<Array<any>>([])

    useEffect(() => {
        getTopVcData()
    }, []);

    const getTopVcData = async () => {
        try {
            const { data } = await axiosInstance.get(`https://vacations-api.onrender.com/charts/`)

            setTopVcData(data)

            return data
        } catch (err) {
            console.log(err)
        }
    }

    const data = [
        { quarter: 1, earnings: Number(topVcData[0]?.user_likes) || 0 },
        { quarter: 2, earnings: Number(topVcData[1]?.user_likes) || 0 },
        { quarter: 3, earnings: Number(topVcData[2]?.user_likes) || 0 },
        { quarter: 4, earnings: Number(topVcData[3]?.user_likes) || 0 },
        { quarter: 5, earnings: Number(topVcData[4]?.user_likes) || 0 },
    ];

    return (
        <>
            <div className="container">
                <div className="row ">
                    <h3 className="center-align ">Top 5 Vacations</h3>
                    <div className="chartMain">
                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={10}

                        >
                            <VictoryAxis
                                tickValues={[1, 2, 3, 4, 5]}
                                tickFormat={[`${topVcData[0]?.destination || ""}`,
                                `${topVcData[1]?.destination || ""}`,
                                `${topVcData[2]?.destination || ""}`,
                                `${topVcData[3]?.destination || ""}`,
                                `${topVcData[4]?.destination || ""}`]}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(x) => (`${x} Likes `)}
                            />
                            <VictoryBar
                                style={{
                                    data: { width: 10 },
                                    labels: { padding: -50 }
                                }}
                                data={data}
                                x="quarter"
                                y="earnings"
                            />
                        </VictoryChart> </div>
                </div>
            </div>
        </>
    );
}

export { Chart };
