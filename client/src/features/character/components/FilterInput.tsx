import { useCallback, useMemo, useState } from 'react'
import { FilterValues } from '@appTypes/character/character.types'
import { filterOptions } from '@lib/character.constants'

interface Props {
  searchText: string
  filters: FilterValues
  onSearchChange: (value: string) => void
  onApplyFilters: (filters: FilterValues) => void
}

export function FilterInput({ searchText, filters, onSearchChange, onApplyFilters }: Props) {
  const [showPopup, setShowPopup] = useState(false)
  const [localFilters, setLocalFilters] = useState<FilterValues>(filters)

  const handleChipChange = useCallback((field: keyof FilterValues, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleApply = useCallback(() => {
    onApplyFilters(localFilters)
    setShowPopup(false)
  }, [onApplyFilters, localFilters])

  const handleTogglePopup = useCallback(() => {
    if (!showPopup) {
      setLocalFilters(filters)
    }
    setShowPopup((prev) => !prev)
  }, [showPopup, filters])

  const hasChanges =
    localFilters.characterType !== filters.characterType ||
    localFilters.species !== filters.species ||
    localFilters.status !== filters.status ||
    localFilters.gender !== filters.gender

  const memoizedFilters = useMemo(() => {
    return filterOptions.map((filter) => (
      <div key={filter.id} className='flex flex-col gap-2'>
        <p className='text-sm text-[#6B7280] font-medium'>{filter.name}</p>
        <div className='grid grid-cols-3 gap-2'>
          {filter.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleChipChange(filter.value, opt)}
              className={`px-2.5 py-4.25 rounded-lg text-sm font-semibold hover:cursor-pointer hover:bg-[#EEE3FF] flex-1 ${
                localFilters[filter.value] === opt
                  ? 'bg-[#EEE3FF] text-[#8054C7]'
                  : 'border-[#E5E7EB] text-[#111827] border'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    ))
  }, [localFilters, handleChipChange])

  const filterContent = (
    <div className='h-full relative flex flex-col gap-3'>
      {memoizedFilters}

      <button
        onClick={handleApply}
        disabled={!hasChanges}
        className={`w-full py-2.25 absolute bottom-4 md:bottom-0 md:relative rounded-lg text-sm font-medium ${
          hasChanges ? 'bg-[#8054C7] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
        }`}
        style={{
          boxShadow: hasChanges ? '0px 1px 2px 0px #0000000D' : '',
        }}
      >
        Filter
      </button>
    </div>
  )

  return (
    <div className='py-2 mb-4 relative'>
      <div className='flex items-center rounded-lg px-3 py-2 gap-2 bg-[#F3F4F6]'>
        <svg
          className='w-4 h-4 text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          strokeWidth='2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        <input
          type='text'
          placeholder='Search or filter results'
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className='flex-1 text-sm outline-none placeholder:text-[#6B7280] placeholder:text-sm placeholder:font-medium'
        />
        <button
          onClick={handleTogglePopup}
          className={`p-1 text-[#8054C7] ${showPopup || hasChanges ? 'w-9.5 h-9.5 rounded-lg flex justify-center items-center bg-[#EEE3FF]' : ''}`}
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
            />
          </svg>
        </button>
      </div>

      {showPopup && (
        <>
          <div
            className='hidden md:block absolute top-full left-0 right-0 mt-1 bg-white rounded-lg z-40 p-4 max-h-90 overflow-y-auto'
            style={{
              boxShadow:
                '0px 4px 6px -2px #0000000D, 0px 10px 15px -3px #0000001A, 0px 0px 0px 1px #0000000D',
            }}
          >
            {filterContent}
          </div>
          <div className='md:hidden fixed inset-0 z-50 bg-white flex flex-col'>
            <div className='flex items-center px-4 py-3 border-b border-gray-200'>
              <button onClick={() => setShowPopup(false)} className='text-purple-500'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
                </svg>
              </button>
              <h2 className='text-lg font-medium flex-1 text-center'>Filters</h2>
              <div className='w-5' />
            </div>
            <div className='flex-1 overflow-y-auto p-4'>{filterContent}</div>
          </div>
        </>
      )}
    </div>
  )
}
