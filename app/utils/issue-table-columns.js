import { typeLabel } from './issue-type.js';

const ID_WIDTH_MIN_CH = 12;
const ID_WIDTH_MAX_CH = 28;
const TYPE_WIDTH_MIN_CH = 8;
const TYPE_WIDTH_MAX_CH = 12;

/**
 * @typedef {{ id?: string | null, issue_type?: string | null }} IssueTableColumnInput
 */

/**
 * Clamp a numeric width in character units.
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clampWidth(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Create issue table widths for ID and type columns.
 *
 * @param {IssueTableColumnInput[]} issues
 * @returns {{ id_width_ch: number, type_width_ch: number }}
 */
export function computeIssueTableColumns(issues) {
  let max_id_length = 0;
  let max_type_length = 0;

  for (const issue of issues) {
    const id_text = String(issue?.id || '');
    const type_text = typeLabel(issue?.issue_type) || '—';
    max_id_length = Math.max(max_id_length, id_text.length);
    max_type_length = Math.max(max_type_length, type_text.length);
  }

  return {
    id_width_ch: clampWidth(max_id_length + 2, ID_WIDTH_MIN_CH, ID_WIDTH_MAX_CH),
    type_width_ch: clampWidth(
      max_type_length + 2,
      TYPE_WIDTH_MIN_CH,
      TYPE_WIDTH_MAX_CH
    )
  };
}
