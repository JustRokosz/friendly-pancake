'use client'

import { useAcquisitions } from '@/services/acquisitions'
import React, { useEffect, useState } from 'react'
import { Progress, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CSVLink } from 'react-csv'
import dynamic from 'next/dynamic'
import { green } from '@ant-design/colors';

type Acquisition = {
  timestamp: number,
  ore_sites: number,
  datetime?: string,
}

const AcquisitionsPage: React.FC = () => {
  const acquisitions = useAcquisitions()
  const [acquisitionsList, setAcquisitionsList] = useState([] as Array<Acquisition>)
  const [oreArray, setOreArray] = useState([] as Array<number>)

  useEffect(() => {
    const res = acquisitions.onAquisitionsCall()

    res.then(data => {
      if (data && data.length) {
        const dataWithDate = data.map((entry: Acquisition) => {
          const date = new Date(entry.timestamp)
          setOreArray(oreArray => [...oreArray, entry.ore_sites])
          entry.datetime = new Intl.DateTimeFormat('en-FI', { dateStyle: 'short', timeStyle: 'full', timeZone: 'EET' }).format(date)
          return entry
        })
        setAcquisitionsList(dataWithDate)
      }
    })
  }, [])

  const calculateOrePercentage = (ore: number) => {
    if (ore === Math.min(...oreArray)) return 1
    if (ore === Math.max(...oreArray)) return 100

    const computedVal = (ore * 100) / Math.max(...oreArray)
    return computedVal
  }

  const columns: ColumnsType<Acquisition> = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
      sorter: {
        compare: (a, b) => a.timestamp - b.timestamp
      }
    },
    {
      title: 'Date',
      dataIndex: 'datetime',
      key: 'datetime',
    },
    {
      title: 'Ore',
      dataIndex: 'ore_sites',
      key: 'ore_sites',
      sortDirections: ['descend', 'ascend'],
      sorter: {
        compare: (a, b) => a.ore_sites - b.ore_sites
      },
      render: (_, { ore_sites }) => (
        <>
          <span style={{ paddingRight: 16 }}>{ore_sites}</span>
          <Progress showInfo={false} percent={calculateOrePercentage(ore_sites)} steps={6} size="small" strokeColor={green[6]} />
        </>
      )
    },
  ]

  return (
    <>
      {(acquisitionsList && acquisitionsList.length) ? (
        <div style={{ display: 'flex', justifyContent: 'end', marginBottom: 20 }}>
          <CSVLink data={acquisitionsList} filename='larvis-report.csv'>
            Download the report
          </CSVLink>
        </div>
      ) : (<></>)}

      <Table columns={columns} dataSource={acquisitionsList} rowKey={(record) => record.timestamp} />
    </>
  )
}

export default dynamic(() => Promise.resolve(AcquisitionsPage), {
  ssr: false
})

