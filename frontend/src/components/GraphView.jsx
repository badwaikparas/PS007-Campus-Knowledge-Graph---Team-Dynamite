import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { getGraph } from '../services/api';
import { Loader2, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

const GraphView = () => {
    const fgRef = useRef();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const graphData = await getGraph();
            setData(graphData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const getNodeColor = (node) => {
        switch (node.type) {
            case 'student': return '#2563eb'; // blue
            case 'faculty': return '#475569'; // slate
            case 'skill': return '#8b5cf6';   // purple
            case 'project': return '#22c55e'; // green
            case 'publication': return '#f97316'; // orange
            default: return '#94a3b8';
        }
    };

    if (loading) {
        return (
            <div className="w-full h-[600px] flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-blue-600" size={48} />
                    <p className="text-slate-500 font-medium">Loading Knowledge Graph...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[600px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <span className="text-xs font-semibold text-slate-600">Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                        <span className="text-xs font-semibold text-slate-600">Faculty</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                        <span className="text-xs font-semibold text-slate-600">Skills</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        <span className="text-xs font-semibold text-slate-600">Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                        <span className="text-xs font-semibold text-slate-600">Publications</span>
                    </div>
                </div>
            </div>

            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={() => fgRef.current.zoomToFit(400)}
                    className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-600"
                    title="Fit to screen"
                >
                    <Maximize2 size={18} />
                </button>
                <button
                    onClick={() => fgRef.current.centerAt(0, 0, 400)}
                    className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-600"
                    title="Recenter"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

            <ForceGraph2D
                ref={fgRef}
                graphData={data}
                nodeLabel="name"
                nodeColor={getNodeColor}
                nodeRelSize={6}
                linkColor={() => '#e2e8f0'}
                linkWidth={1.5}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Inter, sans-serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2 + 8, bckgDimensions[0], bckgDimensions[1]);

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#1e293b';
                    ctx.fillText(label, node.x, node.y + 8);

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = getNodeColor(node);
                    ctx.fill();
                }}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white text-[10px] uppercase tracking-widest font-bold border border-white/10">
                Interactive Knowledge Graph
            </div>
        </div>
    );
};

export default GraphView;
